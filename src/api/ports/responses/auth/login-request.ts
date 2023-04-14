import { UserInterface } from "../../../../interfaces";

type LoginResponse = Omit<UserInterface, 'createdAt' | 'updatedAt'> & { accessToken: string };

export default LoginResponse;

