import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthForm } from "../AuthForm/AuthForm";
import { setUser } from "../../store/slices/userSlice";
import { Center, Text, createStyles } from "@mantine/core";
import { IAuthData } from "../../types";
import { useAppDispatch } from "../../hooks/redux-hooks";

const useStyles = createStyles((theme) => ({
	signInContainer: {
		flexDirection: "column",
	},
}));

export const Login: FC = (): JSX.Element => {
	const { classes } = useStyles();
	const dispatch = useAppDispatch();
	const history = useNavigate();

	const handleLogin = (data: IAuthData) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(({ user }: any) => {
				dispatch(
					setUser({
						id: user.uid,
						email: user.email,
						token: user.accessToken,
					})
				);
				history("/internet-shop");
			})
			.catch(console.error);
	};

	return (
		<Center className={classes.signInContainer} maw={400} h="100vh" mx="auto">
			<Text fz="xl">Login</Text>
			<AuthForm title="Sign in" handleClick={handleLogin} />
			<Text>
				{"Don't have an account yet? "}
				<Link to="/register">Register</Link>
			</Text>
		</Center>
	);
};
