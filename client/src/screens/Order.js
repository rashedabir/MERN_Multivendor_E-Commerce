import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { GlobalState } from "../GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "40px auto",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Login", "Shipping Address", "Payment"];
}

const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <div
      style={{
        maxWidth: "500px",
        textAlign: "center",
        margin: "auto",
        marginBottom: "15px",
      }}
    >
      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            required
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({ field }) => (
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            placeholder="Enter Your Address"
            fullWidth
            required
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="district"
        render={({ field }) => (
          <TextField
            id="district"
            label="Distict"
            variant="outlined"
            placeholder="Enter Your Dristrict"
            fullWidth
            required
            margin="normal"
            {...field}
          />
        )}
      />
    </div>
  );
};

const PaymentForm = () => {
  const { control } = useFormContext();
  const [value, setValue] = useState("bkash");
  return (
    <div
      style={{
        maxWidth: "500px",
        textAlign: "center",
        margin: "auto",
        marginBottom: "15px",
      }}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">Payment Type</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
          <FormControlLabel value="bkash" control={<Radio />} label="Bkash" />
          <FormControlLabel
            value="cod"
            control={<Radio color="primary" />}
            label="Cash on Delivary"
          />
        </RadioGroup>
      </FormControl>
      {value === "bkash" ? (
        <>
          <Typography style={{ margin: "15px 0" }}>
            নাম্বারটিতে "সেন্ড মানি" তে টাকা পাঠিয়ে নিচের ফর্মটি ফিলাপ করে
            সাবমিট করুন...
            <br />
            <strong>bKash Personal No: 01629341869</strong>
          </Typography>
          <Controller
            control={control}
            name="bkash"
            render={({ field }) => (
              <TextField
                id="bkashNumber"
                label="Bkash Number"
                variant="outlined"
                placeholder="Enter Your Bkash Number"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="trxid"
            render={({ field }) => (
              <TextField
                id="trxid"
                label="Transaction Number"
                variant="outlined"
                placeholder="Enter Your Transaction Number"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
        </>
      ) : null}
    </div>
  );
};

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 1:
      return <ContactForm />;
    case 2:
      return <PaymentForm />;
    default:
      return "Unknown stepIndex";
  }
}

function Order() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;
  const [isLogged] = state.userAPI.isLogged;
  const [calback, setCallback] = state.userAPI.callback;
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const methods = useForm({
    defaultValues: {
      phone: "",
      address: "",
      district: "",
      bkash: "",
      trxid: "",
    },
  });
  let active = 0;
  if (isLogged) {
    active = active + 1;
  }

  const [activeStep, setActiveStep] = useState(active);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const fetchCart = async (cart) => {
    await axios.patch(
      "https://shop-clue.herokuapp.com/user/addcart",
      { cart: cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const order = async (data) => {
    try {
      setLoading(true);
      await axios.post(
        "https://shop-clue.herokuapp.com/api/order",
        {
          cart: cart,
          district: data.district,
          address: data.address,
          phone: data.phone,
          bkash: data.bkash,
          trxid: data.trxid,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Order Completed");
      setCart([]);
      fetchCart([]);
      setCallback(!calback);
      history.push("/history");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
      setActiveStep(1);
      history.push("/order");
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div style={{ textAlign: "center", margin: "0px auto" }}>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <>
              <FormProvider {...methods}>
                <form>
                  {getStepContent(activeStep)}

                  <Button
                    className={classes.button}
                    disabled={activeStep === 0 || activeStep === 1}
                    onClick={handleBack}
                  >
                    back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={methods.handleSubmit(order)}
                    >
                      {loading ? (
                        <CircularProgress color="secondary" />
                      ) : (
                        "confirm"
                      )}
                    </Button>
                  ) : (
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      type="button"
                    >
                      Next
                    </Button>
                  )}
                </form>
              </FormProvider>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Order;
