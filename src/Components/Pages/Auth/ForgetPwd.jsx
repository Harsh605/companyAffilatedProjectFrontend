import React, { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Btn, H4, H6, P, Image } from '../../../AbstractElements';
import logoWhite from '../../../assets/images/logo/logo.png';
import logoDark from '../../../assets/images/logo/logo_dark.png';

const ForgetPwd = ({ logoClassMain }) => {
  const [ togglePassword, setTogglePassword ] = useState( false );
  

  const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP digits

  // Refs for each OTP input field
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Function to handle OTP input change
  const handleInputChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field if the current one is filled
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };
  return (
    <Fragment>
      <section>
        <Container className='p-0 login-page' fluid={true}>
          <Row className='m-0'>
            <Col className='p-0'>
              <div className='login-card'>
                <div>
                  <div>
                    <Link className={`logo ${logoClassMain ? logoClassMain : ''}`} to={process.env.PUBLIC_URL}>
                      <Image attrImage={{ className: 'img-fluid for-light', src: logoWhite, alt: 'looginpage' }} />
                      <Image attrImage={{ className: 'img-fluid for-dark', src: logoDark, alt: 'looginpage' }} />
                    </Link>
                  </div>
                  <div className='login-main'>
                    <Form className='theme-form login-form'>
                      <H4>Reset Your Password</H4>
                      <FormGroup>
  <Label className='m-0 col-form-label'>Enter Your Mobile No.</Label>
  <Row>
    <Input className='form-control' type='text' />
  </Row>
</FormGroup>

                      <FormGroup className='text-end'>
                        <Btn attrBtn={{ className: 'btn-block ', color: 'primary', type: 'submit' }}>Send</Btn>
                      </FormGroup>
                      <FormGroup className='mb-4 mt-4'>
                        <span className='reset-password-link'>
                          If don't receive OTP?  
                          <a className='btn-link text-danger' href='#javascript'>
                            Resend
                          </a>
                        </span>
                      </FormGroup>
                      <FormGroup>
                        <Label>Enter OTP</Label>
                        <Row>
        {otp.map((digit, index) => (
          <Col key={index}>
            <Input
              className='form-control text-center opt-text'
              type='text'
              maxLength='1'
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              ref={inputRefs[index]}
            />
          </Col>
        ))}
      </Row>
                      </FormGroup>
                      <H6 attrH6={{ className: 'mt-4' }}>Create Your Password</H6>
                      <FormGroup className='position-relative'>
                        <Label className='col-form-label m-0'>New Password</Label>
                        <div className='position-relative'>
                          <Input className='form-control' type={togglePassword ? 'text' : 'password'} name='login[password]' required placeholder='*********' />
                          <div className='show-hide' onClick={() => setTogglePassword(!togglePassword)}>
                            <span className={togglePassword ? '' : 'show'}></span>
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label className='col-form-label m-0'>Retype Password</Label>
                        <Input className='form-control' type='password' name='login[password]' required='' placeholder='*********' />
                      </FormGroup>
                      <FormGroup>
                        <div className='checkbox'>
                          <Input id='checkbox1' type='checkbox' />
                          <Label className='text-muted' for='checkbox1'>
                            Remember password
                          </Label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Btn attrBtn={{ color: 'primary', className: 'btn d-block w-100', type: 'submit' }}>Done</Btn>
                      </FormGroup>
                      <P attrPara={{ className: 'text-start' }}>
                        Already have an password?
                        <Link
                  className="ms-2"
                  to={`${process.env.PUBLIC_URL}/login`}
                >
                  Sign in
                </Link>
                      </P>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default ForgetPwd;
