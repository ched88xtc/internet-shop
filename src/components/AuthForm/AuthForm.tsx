import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Input, createStyles } from "@mantine/core";
import { IconAt, IconPassword } from "@tabler/icons-react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

interface IAuthFormProps {
	title: string;
	handleClick: (data: any) => void;
}

const useStyles = createStyles((theme) => ({
	inputsContainer: {
		padding: 20,
		display: "flex",
		flexDirection: "column",
		gap: 20,
		alignItems: "center",
	},
	submitBtn: {
		padding: 10,
		width: 100,
		background: "#1c7ed6",
		color: "#fff",
		border: "none",
		borderRadius: 10,
		cursor: "pointer",
		"&:hover": {
			background: "#156fbf",
			transition: "0.3s",
		},
		"&:active": {
			background: "#1c7ed6",
			transition: "0.1s",
		},
	},
	inputWrapper: {
		position: "relative",
	},
	spanError: {
		fontSize: 11,
		color: "red",
		position: "absolute",
	},
}));

export const AuthForm = ({
	title,
	handleClick,
}: IAuthFormProps): JSX.Element => {
	const { classes } = useStyles();

	const schema = object({
		email: string()
			.email("Must be valid email address")
			.required("Email is required"),
		password: string()
			.required("Password is required")
			.min(4, "Password should be bigger"),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<>
			<form onSubmit={handleSubmit(handleClick)}>
				<Container className={classes.inputsContainer} size="xs">
					<Input.Wrapper className={classes.inputWrapper} label="Email">
						<Input
							placeholder="Your email"
							icon={<IconAt />}
							{...register("email")}
						/>
						{errors?.email && (
							<span className={classes.spanError}>
								{errors.email.message?.toString()}
							</span>
						)}
					</Input.Wrapper>
					<Input.Wrapper className={classes.inputWrapper} label="Password">
						<Input
							placeholder="Your password"
							icon={<IconPassword />}
							{...register("password")}
						/>
						{errors?.password && (
							<span className={classes.spanError}>
								{errors.password?.message?.toString()}
							</span>
						)}
					</Input.Wrapper>
					<input className={classes.submitBtn} type="submit" value={title} />
				</Container>
			</form>
		</>
	);
};
