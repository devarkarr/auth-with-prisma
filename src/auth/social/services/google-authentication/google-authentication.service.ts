import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token-provider';
import { UsersService } from 'src/users/services/users.service';
import { GoogleTokenDto } from '../../dtos/google-token.dto';

@Injectable()
export class GoogleAuthenticationService {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersSerive: UsersService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify the Google Token Sent By User
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      // Extract the payload from Google Token
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      // Find the user in the database using the googleId
      const user = await this.usersSerive.findOneByGoogleId(googleId);

      // If user id found generate the tokens
      if (user) {
        return await this.generateTokenProvider.generateToken(user);
      } else {
        // If not create a new user and generate the tokens
        const newUser = await this.usersSerive.create({
          email: email,
          username: firstName + ' ' + lastName,
          googleId: googleId,
        });

        return await this.generateTokenProvider.generateToken(newUser);
      }

      // throw Unauthorised exception if not Authorised
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
