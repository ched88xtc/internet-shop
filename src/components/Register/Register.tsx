import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthForm } from "../AuthForm/AuthForm";
import { setUser } from "../../store/slices/userSlice";
import { Center, Text, createStyles } from "@mantine/core";
import { IAuthData } from "../../types";
import { useAppDispatch } from "../../hooks/redux-hooks";

const useStyles = createStyles((theme) => ({
	signUpContainer: {
		flexDirection: "column",
	},
}));

export const Register: FC = (): JSX.Element => {
	const { classes } = useStyles();
	const dispatch = useAppDispatch();
	const history = useNavigate();

	const handleRegister = (data: IAuthData) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, data.email, data.password)
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
		<Center className={classes.signUpContainer} maw={400} h="100vh" mx="auto">
			<Text fz="xl">Register</Text>
			<AuthForm title="Sign up" handleClick={handleRegister} />
			<Text>
				{"Already have an account? "}
				<Link to="/login">Login</Link>
			</Text>
		</Center>
	);
};
