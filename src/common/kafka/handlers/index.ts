import userRegisterHandler from './user-register';

export default async function messagesHandler() {
  await userRegisterHandler();
}