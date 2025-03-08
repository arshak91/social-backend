export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'social_secret',
  interval: process.env.JWT_EXPIRATION ?? '1d',
};
