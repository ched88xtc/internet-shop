import React, { FC } from "react";
import { CartList } from "../CartList/CartList";
import { Link } from "react-router-dom";
import {
	Button,
	Container,
	Grid,
	Input,
	Text,
	createStyles,
} from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import {
	IconAt,
	IconMap2,
	IconPhone,
	IconUserCircle,
} from "@tabler/icons-react";
import { ICartItem } from "../../types";
import { useAppSelector } from "../../hooks/redux-hooks";

interface IRootState {
	cartProducts: {
		cartProducts: ICartItem[];
		totalPrice: number;
	};
}

const useStyles = createStyles((theme) => ({
	cartContainer: {
		padding: 20,
	},
	formContainer: {
		padding: 20,
		maxWidth: 320,
		border: "solid 0.5px #dfe2e6",
		borderRadius: "0.5rem",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: 15,
	},
	formAndButtonContainer: {
		paddingTop: 21,
		position: "sticky",
		top: 55,
	},
	buttonContainer: {
		paddingTop: 10,
		paddingLeft: 0,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	submitBtn: {
		padding: 10,
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

export const Cart: FC = (): JSX.Element => {
	const { classes } = useStyles();

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const schema = object({
		firstName: string()
			.required("First Name is required")
			.min(3, "First Name should contain 3 or more symbols"),
		lastName: string()
			.required("Last Name is required")
			.min(3, "Last Name should contain 3 or more symbols"),
		address: string()
			.required("Address is required")
			.min(10, "Address cant be so short"),
		phone: string()
			.required("Phone number is required")
			.matches(phoneRegExp, "Phone number is not valid"),
		email: string().email("Must be valid email address"),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { totalPrice, cartProducts } = useAppSelector(
		(state: IRootState) => state.cartProducts
	);

	const onSubmit = (data: any) => {
		data = { ...data, cartProducts };
		//return axios.post("api/orders", data);  //to post some data
		alert(JSON.stringify(data));
	};

	return (
		<Container className={classes.cartContainer}>
			<Grid grow gutter="xs" justify="flex-start" align="flex-start">
				<Grid.Col span={6}>
					<CartList />
				</Grid.Col>
				<Grid.Col span="content" className={classes.formAndButtonContainer}>
					<Container className={classes.formContainer}>
						<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
							<Input.Wrapper
								className={classes.inputWrapper}
								withAsterisk
								label="First Name"
							>
								<Input
									placeholder="Your First Name"
									icon={<IconUserCircle />}
									{...register("firstName")}
								/>
								{errors?.firstName && (
									<span className={classes.spanError}>
										{errors.firstName.message?.toString()}
									</span>
								)}
							</Input.Wrapper>
							<Input.Wrapper
								className={classes.inputWrapper}
								withAsterisk
								label="Last Name"
							>
								<Input
									placeholder="Your Last Name"
									icon={<IconUserCircle />}
									{...register("lastName")}
								/>
								{errors?.lastName && (
									<span className={classes.spanError}>
										{errors.lastName.message?.toString()}
									</span>
								)}
							</Input.Wrapper>
							<Input.Wrapper
								className={classes.inputWrapper}
								withAsterisk
								label="Address"
							>
								<Input
									placeholder="Your address"
									icon={<IconMap2 />}
									{...register("address")}
								/>
								{errors?.address && (
									<span className={classes.spanError}>
										{errors.address.message?.toString()}
									</span>
								)}
							</Input.Wrapper>
							<Input.Wrapper
								className={classes.inputWrapper}
								withAsterisk
								label="Phone"
							>
								<Input
									placeholder="Your phone number"
									icon={<IconPhone />}
									{...register("phone")}
								/>
								{errors?.phone && (
									<span className={classes.spanError}>
										{errors.phone.message?.toString()}
									</span>
								)}
							</Input.Wrapper>
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
							<input
								className={classes.submitBtn}
								type="submit"
								value="Order"
							/>
						</form>
					</Container>
					<Container className={classes.buttonContainer}>
						<Link to="/">
							<Button variant="subtle">{"Back to shop"}</Button>
						</Link>
						<Text fw={500}>Total: ${totalPrice}</Text>
					</Container>
				</Grid.Col>
			</Grid>
		</Container>
	);
};
