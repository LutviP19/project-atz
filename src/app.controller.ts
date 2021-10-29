import {Controller, Get, Res, Render, Request, Post, UseGuards, UseFilters} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {LoginGuard} from "./common/guards/login.guard";
import {AuthenticatedGuard} from "./auth/guards/authenticated.guard";
import {AuthExceptionFilter} from "./filters/auth-exceptions.filter";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private authService: AuthService
  ) {}

  @UseFilters(AuthExceptionFilter)
  @Get('/')
  @Render('login')
  index() {
    return;
  }

  @UseGuards(LoginGuard)
  @UseFilters(AuthExceptionFilter)
  @Post('/login')
  login(@Res() res: Response) {
    res.redirect('/home');
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('home')
  @Render('home')
  async root() {
    return {title: 'Home Page'};
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }


  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('/about')
  @Render('about')
  about() {
    return { title: 'About Page' };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('/hello')
  @Render('hello')
  getHello() {
    //return this.appService.getHello();
    return { title: 'About Page' };
  }

  @UseFilters(AuthExceptionFilter)
  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }

// JWT
  @UseGuards(LocalAuthGuard)
  @Post('auth/login-jwt')
  async loginJwt(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile-jwt')
  getProfileJwt(@Request() req) {
    return req.user;
  }

}
