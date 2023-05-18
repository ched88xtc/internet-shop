import { createSlice } from "@reduxjs/toolkit";
import { getDataFromLS } from "../../helpers/getDataFromLS";
import { IUser } from "../../types";

const initialState = {
	user: getDataFromLS("user", "user"),
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			const user: IUser = {
				id: action.payload.id,
				email: action.payload.email,
				token: action.payload.token,
				isAuth: true,
			};
			state.user = user;
			localStorage.setItem("user", JSON.stringify(state.user));
		},
		removeUser(state) {
			const user: IUser = {
				id: undefined,
				email: undefined,
				token: undefined,
				isAuth: false,
			};
			state.user = user;
			localStorage.removeItem("user");
			localStorage.removeItem("cartProducts");
			localStorage.removeItem("totalPrice");
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
