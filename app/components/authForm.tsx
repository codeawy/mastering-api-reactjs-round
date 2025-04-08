import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchemaData } from "~/schema/register";
import { toast } from "sonner";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import api from "~/api/config/axios";
import { authKeys } from "~/constants/auth";

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaData>({
    resolver: zodResolver(registerSchema),
  });
  console.log(errors);

  const onSubmit = (data: RegisterSchemaData) => {
    console.log(data);
    api
      .post("/auth/local/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(res => {
        // ** Store the jwt at localStorage
        localStorage.setItem(authKeys.TOKEN_KEY, res.data.jwt);
        toast.success("User registered successfully", {
          className: "!bg-green-500 !text-white",
        });
        // TODO: Store the user token in the Cookies

        console.log(res);
      })
      .catch(err =>
        toast.error(err.response.data.error.message, {
          className: "!bg-red-500 !text-white",
        })
      );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-10">
      <Label htmlFor="username">Username</Label>
      <Input placeholder="Username" id="username" {...register("username")} />
      {errors.username && <span className="text-red-500">{errors.username.message}</span>}
      <Label htmlFor="email">Email</Label>
      <Input placeholder="Email" type="email" id="email" {...register("email")} />
      {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      <Label htmlFor="password">Password</Label>
      <Input placeholder="Password" type="password" id="password" {...register("password")} />
      {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      <Button type="submit" className="cursor-pointer w-full">
        Submit
      </Button>
    </form>
  );
};

export default AuthForm;
