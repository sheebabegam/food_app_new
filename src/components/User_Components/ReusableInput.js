import React from "react";
import TextField from "@material-ui/core/TextField";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#9c9a9a",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#9c9a9a",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#9c9a9a",
    },
    "&:hover fieldset": {
      borderColor: "#6439ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9c9a9a",
    },
  },
});

const ReusableInput = React.forwardRef(
  (
    {
      className,
      variant,
      required,
      fullWidth,
      margin,
      id,
      label,
      name,
      inputProps,
      InputLabelProps,
      ...rest
    },
    ref
  ) => {
    return (
      <div>
        <CssTextField
          className={className}
          variant={variant}
          margin={margin}
          required={required}
          fullWidth={fullWidth}
          id={id}
          label={label}
          name={name}
          inputProps={inputProps}
          InputLabelProps={InputLabelProps}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default ReusableInput;
