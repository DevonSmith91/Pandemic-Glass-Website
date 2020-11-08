import React, { useState } from "react";
import meWorking from "../Images/Me_working.jpg";
import instagram from "../Images/footerlink-instagram.png"

export default function Contact(props) {
  const [showContact, setShowContact] = useState(true);
  const [submitted, setSubmitted] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function textInput(e) {
    if (e.target.id === "nameForm") {
      setName(e.target.value);
    } else if (e.target.id === "emailForm") {
      setEmail(e.target.value);
    } else if (e.target.id === "messageForm") {
      setMessage(e.target.value);
    }
  }

  function submit(e) {
    e.preventDefault();
    let dataObj = {
      name: name,
      email: email,
      message: message,
    };

    fetch("/send", {
      method: "POST",
      body: JSON.stringify(dataObj),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          setShowContact(false);
          setSubmitted(true);
        } else if (response.status === "fail") {
          setShowContact(false);
          setSubmitted(false);
        }
      });
  }

  let subMessage;
  if (submitted === true) {
    subMessage = (
      <p>
        Thank you for your message! <br />I will get back to you as soon as possible.
      </p>
    );
  } else if (submitted === false) {
    subMessage = (
      <p>
        I'm Sorry,
        <br />
        Your message has failed to send.
        <br />
        Please try again or directly email me at
        <br /> <a href="mailto:Devon@Pandemic.Glass">Devon@Pandemic.Glass</a>
      </p>
    );
  }

  return (
    <div id="contactWrapper">
      <div id="contactLeft">
        <img id="workingPic" src={meWorking} alt="Picture of me working" />
        {/* <p id="contactPara">
          Please feel free to reach out with any comments, concerns, or interest
          in potential collaboration projects!
        </p> */}
      </div>
      <div id="contactCenter"></div>
      <div id="contactRight">
        {showContact ? (
          <form id="contactFormsWrapper" onSubmit={submit} method="POST">
            <div id="contactForms">
              <div className="formInput">
                <label className="label">Name</label>
                <input
                  id="nameForm"
                  type="text"
                  onChange={textInput}
                  required
                />
              </div>
              <div className="formInput">
                <label className="label">Email address</label>
                <input
                  id="emailForm"
                  type="email"
                  aria-describedby="emailHelp"
                  onChange={textInput}
                  required
                />
              </div>
              <div className="formInput">
                <label className="label">Message</label>
                <textarea
                  id="messageForm"
                  rows="3.7"
                  onChange={textInput}
                  required
                ></textarea>
              </div>
              <button id="submitButton" type="submit">
                Submit
              </button>
              <div id="connectionLinks">
                <a href="https://www.instagram.com/pandemic_glass/">
                  <img className="connections" src={instagram} alt="" />
                </a>
              </div>
            </div>
          </form>
        ) : (
          <div id="subMessage">{subMessage}</div>
        )}
      </div>
    </div>
  );
}
