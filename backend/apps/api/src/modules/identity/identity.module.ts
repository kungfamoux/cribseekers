import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../database/prisma.module';
import { UserController } from './controller/user.controller';
import { RoleController } from './controller/role.controller';
import { PermissionController } from './controller/permission.controller';
import { AuthController } from './controller/auth.controller';
import { UserService } from './service/user.service';
import { RoleService } from './service/role.service';
import { PermissionService } from './service/permission.service';
import { AuthService } from './service/auth.service';
import { UserRepository } from './repository/user.repository';
import { RoleRepository } from './repository/role.repository';
import { PermissionRepository } from './repository/permission.repository';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      },
    }),
  ],
  controllers: [
    UserController,
    RoleController,
    PermissionController,
    AuthController,
  ],
  providers: [
    UserService,
    RoleService,
    PermissionService,
    AuthService,
    UserRepository,
    RoleRepository,
    PermissionRepository,
    JwtStrategy,
  ],
  exports: [
    UserService,
    RoleService,
    PermissionService,
    AuthService,
    UserRepository,
    RoleRepository,
    PermissionRepository,
  ],
})
export class IdentityModule {}
