// MyDialogComponent.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";

import { sendAutomatedEmail } from "../../redux/email/emailSlice";
import { useDispatch } from "react-redux";

// subject, send_to, reply_to, template, url
const DialogOpen = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseSendRequest = () => {
    const subject = "send email request";
    const send_to = "adheshiva02@gmail.com";
    const reply_to = "noreplay@gmail.com";
    const template = "changePassword";
    const url = "url";
    console.log("send email request");
    dispatch(sendAutomatedEmail({ subject, send_to, reply_to, template, url }));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2
        onClick={handleClickOpen}
        className="cs_profile_edit_view_top_heading"
      >
        Edit Request
      </h2>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle m="20px">{"Edit Profile Request"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseSendRequest}>Send Request</Button>
          <Button onClick={handleClose}>Back</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogOpen;
