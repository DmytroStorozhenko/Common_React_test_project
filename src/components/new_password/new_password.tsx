import React, {useState} from "react";
import styles from "./new_password.module.css"
import {Api} from "../../API/API";
import {emailValidate} from "../../common/helpers/validations_rules";
import {useForm} from "../../common/customHooks/useForm";
import {Redirect, useParams} from "react-router-dom";
import {routes} from "../navbar/Navbar";

export const NewPassword = () => {
    let [responseMessage, setResponseMessage] = useState<string | undefined>('')
    let [isDisable, setIsDisable] = useState<boolean>(false)
    let {token} = useParams<{token?: string }>();

    const submitCallback = async () => {
        setIsDisable(true)
        try {
            let response = await Api.setNewPassword(values.confirmPassword, token)
            setResponseMessage(response.data.info)
            setTimeout(() => {
                return <Redirect to={routes.forLogin}/>
            }, 3000)
        } catch (error) {
            errors.confirmPassword = error.response.data.error
        } finally {
            setIsDisable(false)
        }
    }

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(submitCallback, emailValidate)


    return <>
        <div className={styles.new_password}>
            <p>Enter your new password:</p>
            <div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className='mb-3'>
                        <input
                            type='password'
                            name='password'
                            value={values.password || ''}
                            className={`form-control ${errors.password && 'is-invalid'}`}
                            placeholder='New password'
                            onChange={handleChange}
                            disabled={isDisable}
                            autoComplete='off'
                        />
                        {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                        <input
                            type='password'
                            name='confirmPassword'
                            value={values.confirmPassword || ''}
                            className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                            placeholder='Confirm password'
                            onChange={handleChange}
                            disabled={isDisable}
                            autoComplete='off'
                        />
                        {errors.confirmPassword && <div className='invalid-feedback'>{errors.confirmPassword}</div>}
                        {responseMessage && <div className={styles.responseMessage}>{responseMessage}</div>}
                        {isDisable && <div className={`spinner-border ${styles.spinner}`} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </div>
                    <button
                        className='btn btn-primary'
                        type='submit'
                    >Change
                    </button>
                </form>
            </div>
        </div>
    </>
}
