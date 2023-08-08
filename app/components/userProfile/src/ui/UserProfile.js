/* eslint-disable react/prop-types */

import React, { Fragment } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'

import { H3, H4 } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import {useTranslation} from "react-i18next";

import RibbonFeedback from './RibbonFeedback'
import { Loading, Button } from '../../../../ui'
import TextField from './TextField'
import Form from './Form'

const Container = styled.div`
  clear: both;
  display: block;
  float: none;
  height: 100%;
  margin: 0 auto;
  max-width: 100%;
`

const Title = styled(H3)`
  color: #3f3f3f;
  font-family: ${th('fontReading')};
  font-weight: normal;
  margin: 0;
  margin-right: calc(3 * ${th('gridUnit')});
  padding-bottom: 0;
  padding-top: 3px;
  text-transform: uppercase;
`

const InnerWrapper = styled.div`
  clear: both;
  display: block;
  float: none;
  height: calc(100% - 80px);
  margin: 0 auto;
  max-width: 76%;
`

const HeaderWrapper = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  height: calc(9 * ${th('gridUnit')});
  justify-content: flex-start;
  margin-bottom: calc(1 * ${th('gridUnit')});
  position: sticky;
  top: 0;
  z-index: 1;
`

const SectionWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`

const InnerSectionWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: calc(${th('gridUnit')} * 2);
`

const SectionHeader = styled(H4)`
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-weight: normal;
  margin: calc(${th('gridUnit')} * 2) 0;
`

const PersonalInformation = props => {
  const { givenNames, surname, update, userId } = props

    const { t } = useTranslation()


  const initialValues = {
    givenNames,
    surname,
  }

  const validations = yup.object().shape({
    givenNames: yup.string().required(t('given_names_are_required')),
    surname: yup.string().required(t('surname_is_required')),
  })

  return (
    <InnerSectionWrapper>
      <SectionHeader>{t('personal_information')}</SectionHeader>
      <RibbonFeedback
        keepSpaceOccupied={false}
        successMessage={t("personal_information_successfully_updated")}
      >
        {notifyRibbon => {
          const handleSubmit = (formValues, formkikBag) => {
            update(userId, formValues).then(() => notifyRibbon(true))
          }

          return (
            <Form
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validations}
            >
              {formProps => {
                const {
                  errors,
                  handleBlur,
                  handleChange,
                  isValid,
                  touched,
                  values,
                } = formProps

                const disabled =
                  (values.givenNames === initialValues.givenNames &&
                    values.surname === initialValues.surname) ||
                  !isValid

                return (
                  <>
                    <TextField
                      error={errors.givenNames}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label={t("given_name")}
                      name="givenNames"
                      touched={touched}
                      value={values.givenNames}
                    />

                    <TextField
                      error={errors.surname}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label={t("surname")}
                      name="surname"
                      touched={touched}
                      value={values.surname}
                    />

                    <Button
                      disabled={disabled}
                      label={t("update")}
                      title={t("update")}
                      type="submit"
                    />
                  </>
                )
              }}
            </Form>
          )
        }}
      </RibbonFeedback>
    </InnerSectionWrapper>
  )
}

const Password = props => {
  const { update, userId } = props

    const { t } = useTranslation()

  const initialValues = {
    currentPassword: '',
    newPassword1: '',
    newPassword2: '',
  }

  const validations = yup.object().shape({
    currentPassword: yup.string().required(t('current_password_is_required')),
    // newPassword1: yup.string().required('New password is required'),
      newPassword1: yup.string().required(t('new_password_is_required')),
    newPassword2: yup
      .string()
      .required(t('please_re_enter_your_new_password'))
      .test(
        'new-password-match',
        /* 'Passwords do not match', */
          t('passwords_do_not_match'),
        /* eslint-disable func-names, react/no-this-in-sfc */
        function (val) {
          return val === this.parent.newPassword1
        },
      ),
  })

  return (
    <InnerSectionWrapper>
      <SectionHeader>{t("change_password")}</SectionHeader>
      <RibbonFeedback
        /* errorMessage="Current password is incorrect" */
          errorMessage={t("current_password_is_incorrect")}
        keepSpaceOccupied={false}
        /* successMessage="Password successfully updated" */
          successMessage={t("password_successfully_updated")}
      >
        {notifyRibbon => {
          const handleSubmit = (formValues, { resetForm }) => {
            const { currentPassword, newPassword1 } = formValues

            const patch = {
              currentPassword,
              newPassword: newPassword1,
              id: userId,
            }

            update(patch)
              .then(() => {
                resetForm({
                  values: {
                    currentPassword: '',
                    newPassword1: '',
                    newPassword2: '',
                  },
                })
                notifyRibbon(true)
              })
              .catch(err => {
                const errorMessage = err.graphQLErrors[0].message
                  .split(':')
                  .pop()
                  .trim()

                /* const messages = [
                  'Current password is not valid',
                  'New password must be different from current password',
                ] */
                  const messages = [
                      t('current password is not valid'),
                      t('new_password_must_be_different_from_current_password'),
                  ]

                // let msg = 'Something went wrong!'

                   let msg = t('something_went_wrong!')
                  if (messages.includes(errorMessage)) msg = errorMessage

                notifyRibbon(false, msg)
              })
          }

          return (
            <Form
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validations}
            >
              {formProps => {
                const {
                  errors,
                  handleBlur,
                  handleChange,
                  isValid,
                  touched,
                  values,
                } = formProps

                return (
                  <>
                    <TextField
                      error={errors.currentPassword}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label={t("current_password")}
                      name="currentPassword"
                      touched={touched}
                      type="password"
                      value={values.currentPassword}
                    />

                    <TextField
                      error={errors.newPassword1}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label={t("new_password")}
                      name="newPassword1"
                      touched={touched}
                      type="password"
                      value={values.newPassword1}
                    />

                    <TextField
                      error={errors.newPassword2}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label={t("repeat_new_password")}
                      name="newPassword2"
                      touched={touched}
                      type="password"
                      value={values.newPassword2}
                    />

                    <Button
                      disabled={!isValid}
                      label={t("change_password")}
                      title={t("change_password")}
                      type="submit"
                    />
                  </>
                )
              }}
            </Form>
          )
        }}
      </RibbonFeedback>
    </InnerSectionWrapper>
  )
}

const UserProfile = props => {
  const { data, loading, updatePassword, updatePersonalInformation } = props
    const { t } = useTranslation()

    if (loading) return <Loading />
  const { givenNames, surname, id } = data

  return (
    <Container>
      <InnerWrapper>
        <HeaderWrapper>
          <Title>{t('user_profile')}</Title>
        </HeaderWrapper>
        <SectionWrapper>
          <PersonalInformation
            givenNames={givenNames}
            surname={surname}
            update={updatePersonalInformation}
            userId={id}
          />
          <Password update={updatePassword} userId={id} />
        </SectionWrapper>
      </InnerWrapper>
    </Container>
  )
}

export default UserProfile
