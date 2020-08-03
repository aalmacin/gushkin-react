import React, { useState } from "react";
import classes from "./WishForm.module.scss";


import { MICRO_AMOUNT } from "functions/global.constants";
import TextField from "complib/TextField";
import NumberField from "complib/NumberField";
import Button, { ButtonType } from "complib/Button";
import { createWish } from "models/Wish/Wish.mutations";
import { CreateWishInput, Priority, Status } from "models/Wish/Wish.types";
import ErrorList from "pages/error";

function WishForm() {
  const [wish, setWish] = useState<CreateWishInput>({
    description: "",
    price: 0,
    source: "",
    priority: Priority.VERY_HIGH,
    status: Status.not_bought
  });

  const [errors, setErrors] = useState<string[]>([]);


  const getErrors = () => {
    const errorList = [];

    if (!wish.description) {
      errorList.push("Description is required.");
    }

    if (!wish.price) {
      errorList.push("Price is required.");
    }

    if (!wish.priority) {
      errorList.push("Priority is required.");
    }

    if (!wish.status) {
      errorList.push("Status is required.");
    }

    return errorList;
  };

  const updateFormControl = (
    key: "description" | "price" | "source" | "priority" | "status"
  ) => (event: any) => {
    setWish({
      ...wish,
      [key]: event.target.value
    });
    setErrors(getErrors());
  };

  const submitFormHandler = () => {
    const errorList = getErrors();
    setErrors(errorList);

    if (errorList.length === 0) {
      const price = parseFloat(`${wish.price}`) * MICRO_AMOUNT;
      createWish({
        ...wish,
        price
      })
    }
  };

  const priorityOptions = [
    {
      value: Priority.VERY_HIGH,
      desc: "Very High"
    },
    {
      value: Priority.HIGH,
      desc: "High"
    },
    {
      value: Priority.MEDIUM,
      desc: "Medium"
    },
    {
      value: Priority.LOW,
      desc: "Low"
    },
    {
      value: Priority.VERY_LOW,
      desc: "Very Low"
    }
  ];

  const statusOptions = [
    {
      value: Status.not_bought,
      desc: "Not bought"
    },
    {
      value: Status.bought,
      desc: "Bought"
    },
    {
      value: Status.disabled,
      desc: "Disabled"
    }
  ];

  return (
    <div className={classes.WishForm}>
      <ErrorList errors={errors} />
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <TextField
            label="Description"
            value={wish.description}
            onChange={updateFormControl("description")}
          />
        </div>
        <div>
          <NumberField
            label="Price"
            value={wish.price}
            onChange={updateFormControl("price")}
          />
        </div>
        <div>
          <TextField
            label="Source"
            value={wish.source}
            onChange={updateFormControl("source")}
          />
        </div>
        <div>
          <label>Priority</label>
          <select
            onChange={updateFormControl("priority")}
            value={wish.priority}
          >
            {priorityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.desc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Status</label>
          <select
            onChange={updateFormControl("status")}
            value={wish.status}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.desc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Button
            type={ButtonType.primary}
            onClick={submitFormHandler}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default WishForm;
