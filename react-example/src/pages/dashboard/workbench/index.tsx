
/*import { Col, Row, Space } from "antd";

import AreaDownload from "./area-download";
import BannerCard from "./banner-card";
import { Applications, Conversion } from "./conversion_applications";
import CurrentDownload from "./current-download";
import NewInvoice from "./new-invoice";
import TopAuthor from "./top-authors";
import TopInstalled from "./top-installed";
import TopRelated from "./top-related";
import TotalCard from "./total-card";*/
import {
	Paper,
	Divider,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Button,
	Select,
	MenuItem,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	ClickAwayListener,
	ButtonBase,
	Popper,
	InputBase,
	Box,
} from "@mui/material";
import * as React from "react";
import { useState, Fragment } from "react";
import { faker } from "@faker-js/faker";
import { useTheme, styled } from "@mui/material/styles";
import Autocomplete, { type AutocompleteCloseReason, autocompleteClasses } from "@mui/material/Autocomplete";
import { Settings as SettingsIcon, Close as CloseIcon, Done as DoneIcon } from "@mui/icons-material";
import { useForm, type SubmitHandler } from "react-hook-form";
import trpcClient from '@/utils/trpc'



interface User {
	name: string;
	age: number;
	sex: string;
	fakeId: string;
}

/*const selectChange = (e: { target: { value: any } }) => {
	console.log(e.target.value);
};*/

const clickRow = (record: User) => {
	console.log(`h·world:·${JSON.stringify(record)}`);
};

function Workbench() {
	const [rows, setRows] = useState<User[]>([
		{ name: "row1", age: 18, sex: "male", fakeId: "1" },
		{ name: "row2", age: 19, sex: "male", fakeId: "2" },
		{ name: "row3", age: 18, sex: "female", fakeId: "3" },
		{ name: "row4", age: 21, sex: "female", fakeId: "4" },
	]);

	/*const handleClick: SubmitHandler<any> = (value: User): void => {
        //let [name, age, sex] = watch(['name', 'age', 'sex']);
        setRows([...rows, { name: value.name, age: value.age, sex: value.sex, fakeId: faker.string.uuid() }]);
    };*/
	const handleClick: SubmitHandler<any> = (): void => {
		//let [name, age, sex] = watch(['name', 'age', 'sex']);
		handleSubmit((value) => {
			setRows([...rows, { name: value.name, age: value.age, sex: value.sex, fakeId: faker.string.uuid() }]);
		})();

		//
	};



	// region GitHub type Autocomplete
	interface PopperComponentProps {
		anchorEl?: any;
		disablePortal?: boolean;
		open: boolean;
	}

	const StyledAutocompletePopper = styled("div")(({ theme }) => ({
		[`& .${autocompleteClasses.paper}`]: {
			boxShadow: "none",
			margin: 0,
			color: "inherit",
			fontSize: 13,
		},
		[`& .${autocompleteClasses.listbox}`]: {
			padding: 0,
			backgroundColor: "#fff",
			...theme.applyStyles("dark", {
				backgroundColor: "#1c2128",
			}),
			[`& .${autocompleteClasses.option}`]: {
				minHeight: "auto",
				alignItems: "flex-start",
				padding: 8,
				borderBottom: "1px solid #eaecef",
				...theme.applyStyles("dark", {
					borderBottom: "1px solid #30363d",
				}),
				'&[aria-selected="true"]': {
					backgroundColor: "transparent",
				},
				[`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]: {
					backgroundColor: theme.palette.action.hover,
				},
			},
		},
		[`&.${autocompleteClasses.popperDisablePortal}`]: {
			position: "relative",
		},
	}));

	function PopperComponent(props: PopperComponentProps) {
		const { disablePortal, anchorEl, open, ...other } = props;
		return <StyledAutocompletePopper {...other} />;
	}

	const StyledPopper = styled(Popper)(({ theme }) => ({
		border: "1px solid #e1e4e8",
		boxShadow: `0 8px 24px ${"rgba(149, 157, 165, 0.2)"}`,
		color: "#24292e",
		backgroundColor: "#fff",
		borderRadius: 6,
		width: 300,
		zIndex: theme.zIndex.modal,
		fontSize: 13,
		...theme.applyStyles("dark", {
			border: "1px solid #30363d",
			boxShadow: "0 8px 24px rgb(1, 4, 9)",
			color: "#c9d1d9",
			backgroundColor: "#1c2128",
		}),
	}));

	const StyledInput = styled(InputBase)(({ theme }) => ({
		padding: 10,
		width: "100%",
		borderBottom: "1px solid #eaecef",
		...theme.applyStyles("dark", {
			borderBottom: "1px solid #30363d",
		}),
		"& input": {
			borderRadius: 4,
			padding: 8,
			transition: theme.transitions.create(["border-color", "box-shadow"]),
			fontSize: 14,
			backgroundColor: "#fff",
			border: "1px solid #30363d",
			...theme.applyStyles("dark", {
				backgroundColor: "#0d1117",
				border: "1px solid #eaecef",
			}),
			"&:focus": {
				boxShadow: "0px 0px 0px 3px rgba(3, 102, 214, 0.3)",
				borderColor: "#0366d6",
				...theme.applyStyles("dark", {
					boxShadow: "0px 0px 0px 3px rgb(12, 45, 107)",
					borderColor: "#388bfd",
				}),
			},
		},
	}));

	const Button1 = styled(ButtonBase)(({ theme }) => ({
		fontSize: 13,
		width: "100%",
		textAlign: "left",
		paddingBottom: 8,
		fontWeight: 600,
		color: "#586069",
		...theme.applyStyles("dark", {
			color: "#8b949e",
		}),
		"&:hover,&:focus": {
			color: "#0366d6",
			...theme.applyStyles("dark", {
				color: "#58a6ff",
			}),
		},
		"& span": {
			width: "100%",
		},
		"& svg": {
			width: 16,
			height: 16,
		},
	}));

	const labels = [
		{
			name: "male",
			color: "#7057ff",
			description: "male",
		},
		{
			name: "female",
			color: "#008672",
			description: "female",
		},
	];

	const hasInitialized = React.useRef(false);
	const GitHubLabel = React.forwardRef<Element, { defaultValue: { sex: string } }>(({ defaultValue }, _) => {
		const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
		const [value, setValue] = useState<LabelType[]>([]);
		React.useEffect(() => {
			if (hasInitialized.current) return;
			let defaultLabel = null;
			for (const label of labels) {
				if (label.name === defaultValue.sex) {
					defaultLabel = label;
					return;
				}
			}
			if (defaultLabel) {
				setValue([defaultLabel]);
				setValue1("sex", defaultValue.sex);
			}
			hasInitialized.current = true;
		}, [defaultValue.sex]);

		const [pendingValue, setPendingValue] = useState<LabelType[]>([]);
		const theme = useTheme();

		const handleClick = (event: React.MouseEvent<HTMLElement>) => {
			setPendingValue(value);
			setAnchorEl(event.currentTarget);
		};

		const handleClose = () => {
			setValue(pendingValue);

			if (!pendingValue.length) setValue1("sex", "");
			else setValue1("sex", pendingValue.map((obj) => obj.name).join(","));

			if (anchorEl) {
				anchorEl.focus();
			}
			setAnchorEl(null);
		};

		const open = Boolean(anchorEl);
		const id = open ? "github-label" : undefined;

		return (
			<Fragment>
				<Box sx={{ width: 221, fontSize: 13 }}>
					<Button1 disableRipple aria-describedby={id} onClick={handleClick}>
						<span>favorite sex</span>
						<SettingsIcon />
					</Button1>
					{value.map((label) => (
						<Box
							key={label.name}
							sx={{
								mt: "3px",
								height: 20,
								padding: ".15em 4px",
								fontWeight: 600,
								lineHeight: "15px",
								borderRadius: "2px",
							}}
							style={{
								backgroundColor: label.color,
								color: theme.palette.getContrastText(label.color),
							}}
						>
							{label.name}
						</Box>
					))}
				</Box>
				<StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
					<ClickAwayListener onClickAway={handleClose}>
						<div>
							<Box
								sx={(t) => ({
									borderBottom: "1px solid #30363d",
									padding: "8px 10px",
									fontWeight: 600,
									...t.applyStyles("light", {
										borderBottom: "1px solid #eaecef",
									}),
								})}
							>
								please sex that you like most
							</Box>
							<Autocomplete
								open
								multiple
								onClose={(_event: React.ChangeEvent<any>, reason: AutocompleteCloseReason) => {
									if (reason === "escape") {
										handleClose();
									}
								}}
								value={pendingValue}
								onChange={(event, newValue, reason) => {
									if (
										event.type === "keydown" &&
										((event as React.KeyboardEvent).key === "Backspace" ||
											(event as React.KeyboardEvent).key === "Delete") &&
										reason === "removeOption"
									) {
										return;
									}
									setPendingValue(newValue);
								}}
								disableCloseOnSelect
								renderTags={() => null}
								noOptionsText="No labels"
								renderOption={(props, option, { selected }) => {
									const { key, ...optionProps } = props;
									return (
										<li key={key} {...optionProps}>
											<Box
												component={DoneIcon}
												sx={{ width: 17, height: 17, mr: "5px", ml: "-2px" }}
												style={{
													visibility: selected ? "visible" : "hidden",
												}}
											/>
											<Box
												component="span"
												sx={{
													width: 14,
													height: 14,
													flexShrink: 0,
													borderRadius: "3px",
													mr: 1,
													mt: "2px",
												}}
												style={{ backgroundColor: option.color }}
											/>
											<Box
												sx={(t) => ({
													flexGrow: 1,
													"& span": {
														color: "#8b949e",
														...t.applyStyles("light", {
															color: "#586069",
														}),
													},
												})}
											>
												{option.name}
												<br />
												<span>{option.description}</span>
											</Box>
											<Box
												component={CloseIcon}
												sx={{ opacity: 0.6, width: 18, height: 18 }}
												style={{
													visibility: selected ? "visible" : "hidden",
												}}
											/>
										</li>
									);
								}}
								options={[...labels].sort((a, b) => {
									// Display the selected labels first.
									let ai = value.indexOf(a);
									ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
									let bi = value.indexOf(b);
									bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
									return ai - bi;
								})}
								getOptionLabel={(option) => option.name}
								renderInput={(params) => (
									<StyledInput
										ref={params.InputProps.ref}
										inputProps={params.inputProps}
										autoFocus
										placeholder="Filter labels"
									/>
								)}
								slots={{
									popper: PopperComponent,
								}}
							/>
						</div>
					</ClickAwayListener>
				</StyledPopper>
			</Fragment>
		);
	});

	interface LabelType {
		name: string;
		color: string;
		description?: string;
	}

	const defaultObj = {
		name: "",
		age: 10,
		sex: "",
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue: setValue1,
	} = useForm({
		defaultValues: defaultObj,
	});



	const tryTrpc = async () =>{

		let useQuery = await trpcClient.role.deleteUser.mutate()
		//console.log(useQuery)
		console.log(useQuery);

	}
	const login = async () => {
		await trpcClient.user.login.query({username:'tony', password:'123456'})
	}
	return (
		<div className="p-2">
			<div className="mt-2">
				<form>
					<FormControl>
						<InputLabel htmlFor="yourname">username</InputLabel>
						<Input id="yourname" {...register("name", { required: true })} aria-describedby="username-help" />
						{errors.name?.type === "required" && <span style={{ color: "red" }}>This name field is required</span>}
						<FormHelperText id="username-help">please input your name</FormHelperText>
					</FormControl>
					<FormControl style={{ width: "80px", marginLeft: "20px" }}>
						<InputLabel htmlFor="select-age-id">Age</InputLabel>
						<Select labelId="select-age-id" id="demo-simple-select" defaultValue={10} {...register("age")}>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={30}>30</MenuItem>
						</Select>
					</FormControl>
					<GitHubLabel {...register("sex", { required: true })} defaultValue={defaultObj} />
					{errors.sex?.type === "required" && <span style={{ color: "red" }}>This sex field is required</span>}
					<div>
						<Button variant="contained" sx={{ mt: 1 }} color="primary" onClick={handleClick}>
							submit
						</Button>
						<Button variant="contained" sx={{ mt: 1, ml: 1 }} color="primary" onClick={tryTrpc}>
							try trpc
						</Button>
						<Button variant="contained" sx={{ mt: 1, ml: 1 }} color="primary" onClick={()=> trpcClient.role.syncUser.mutate()}>
							sync user
						</Button>

						<Button variant="contained" sx={{ mt: 1, ml: 1 }} color="primary" onClick={login}>
							login
						</Button>

					</div>
				</form>
			</div>
			<Divider component="li">Table</Divider>
			<TableContainer component={Paper} style={{ marginTop: "40px" }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">username</TableCell>
							<TableCell align="center">age</TableCell>
							<TableCell align="center">sex</TableCell>
							<TableCell align="center">operation</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.fakeId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row" align="center">
									{row.name}
								</TableCell>
								<TableCell align="center">{row.age}</TableCell>
								<TableCell align="center">{row.sex}</TableCell>
								<TableCell align="center" scope="row" component="th">
									<Button variant="contained" color="primary" onClick={() => clickRow(row)}>
										click Me
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
	/*return (
        <div className="p-2">
            <Row gutter={[16, 16]} justify="center">
                <Col span={24} lg={16}>
                    <BannerCard />
                </Col>
                <Col span={24} lg={8}>
                    <Space direction="vertical" size="large" className="h-full w-full justify-center">
                        <Conversion />
                        <Applications />
                    </Space>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-4" justify="center">
                <Col span={24} md={8}>
                    <TotalCard
                        title="Total Active Users"
                        increase
                        count="18,765"
                        percent="2.6%"
                        chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
                    />
                </Col>

                <Col span={24} md={8}>
                    <TotalCard
                        title="Total Installed"
                        increase
                        count="4,876"
                        percent="0.2%"
                        chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
                    />
                </Col>

                <Col span={24} md={8}>
                    <TotalCard
                        title="Total Downloads"
                        increase={false}
                        count="678"
                        percent="0.1%"
                        chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
                    />
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-4" justify="center">
                <Col span={24} md={12} lg={8}>
                    <CurrentDownload />
                </Col>
                <Col span={24} md={12} lg={16}>
                    <AreaDownload />
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-4" justify="center">
                <Col span={24} md={12} lg={16}>
                    <NewInvoice />
                </Col>
                <Col span={24} md={12} lg={8}>
                    <TopRelated />
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-4" justify="center">
                <Col span={24} md={12}>
                    <TopInstalled />
                </Col>

                <Col span={24} md={12}>
                    <TopAuthor />
                </Col>
            </Row>
        </div>
    );*/
}

export default Workbench;
