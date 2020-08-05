import React, { useState } from "react";
import classes from "./ActivityForm.module.scss";
import { MICRO_AMOUNT } from "functions/global.constants";
import Button, { ButtonType } from "complib/Button";
import TextField from "complib/TextField";
import NumberField from "complib/NumberField";
import FormClose from "pages/main/shared/FormClose";
import Loading from "complib/Loading";
import { CreateActivity } from "models/Activity/Activity.mutations";
import { ActivityInput } from "models/Activity/Activity.types";
import ErrorList from "pages/error";
import { useMutation } from "@apollo/react-hooks";


interface ActivityFormProps {
  closeHandler: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ closeHandler }) => {
  const [createActivity] = useMutation(CreateActivity)
  const initialFormState = {
    description: "",
    fundAmt: 0,
    positive: true
  }
  const [activity, setActivity] = useState<ActivityInput>(initialFormState);

  const [errors, setErrors] = useState<string[]>([]);

  // TODO: Replace with real
  const isActivitiesActionLoading = false;

  const getErrors = () => {
    const errorList = [];

    if (!activity.description) {
      errorList.push("Description is required.");
    }

    if (!activity.fundAmt) {
      errorList.push("Price is required.");
    }

    return errorList;
  };

  const updateFormControl = (key: "description" | "fundAmt") => (
    event: any
  ) => {
    setActivity({
      ...activity,
      [key]: event.target.value
    });
    setErrors(getErrors());
  };

  const updatePositive = () => {
    setActivity({
      ...activity,
      positive: !activity.positive
    });
    setErrors(getErrors());
  };

  const submitFormHandler = () => {
    const errorList = getErrors();
    setErrors(errorList);

    if (errorList.length === 0) {
      const fundAmt = parseFloat(`${activity.fundAmt}`) * MICRO_AMOUNT;
      createActivity({
        variables: {
          ...activity,
          fundAmt
        }
      })

      setActivity({ ...initialFormState });
    }
  };

  return (
    <div className={classes.ActivityForm}>
      <ErrorList errors={errors} />
      <div className={classes.FormContainer}>
        <FormClose onClose={closeHandler} />
        {isActivitiesActionLoading ? <Loading /> : <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className={classes.FormGroup}>
            <TextField
              label="Description"
              value={activity.description}
              onChange={updateFormControl("description")}
            />
          </div>
          <div className={classes.FormGroup}>
            <NumberField
              label="Fund Amount"
              value={activity.fundAmt}
              onChange={updateFormControl("fundAmt")}
            />
          </div>
          <div className={classes.FormGroup}>
            <label>Positive</label>
            <input
              type="checkbox"
              checked={activity.positive}
              onChange={updatePositive}
            />
          </div>
          <div className={classes.ButtonContainer}>
            <Button
              type={ButtonType.primary}
              onClick={submitFormHandler}
            >
              Submit
            </Button>
          </div>
        </form>
        }
      </div>
    </div>
  );
};

export default ActivityForm;
