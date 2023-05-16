/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import styled from 'styled-components'
import { grid } from '@pubsweet/ui-toolkit'
import { NavBar, NavBarLink, Dropdown } from '../../../ui'

const StyledLogo = styled.img`
  display: block;
  height: ${grid(4)};
  width: ${grid(4)};
`

const featureBookStructureEnabled =
  (process.env.FEATURE_BOOK_STRUCTURE &&
    JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
  false

const navLinksBuilder = (location, isAdminOrGlobal) => {
  const navLinksLeft = []

  const inDashboard =
    (location.pathname.match(/books/g) &&
      location.pathname.match(/books/g).length === 1 &&
      !location.pathname.match(/bookComponents/g) &&
      !location.pathname.match(/book-builder/g)) ||
    false

  navLinksLeft.push(
    <NavBarLink active={inDashboard.toString()} key="nav-books" to="/books">
      Books
    </NavBarLink>,
  )

  if (featureBookStructureEnabled) {
    if (isAdminOrGlobal) {
      const inTemplates =
        (location.pathname.match(/templates/g) &&
          location.pathname.match(/templates/g).length === 1) ||
        false

      navLinksLeft.push(
        <NavBarLink
          active={inTemplates.toString()}
          key="nav-templates"
          to="/templates"
        >
          Templates
        </NavBarLink>,
      )
    }

    return navLinksLeft
  }

  const inTemplates =
    (location.pathname.match(/templates/g) &&
      location.pathname.match(/templates/g).length === 1) ||
    false

  navLinksLeft.push(
    <NavBarLink
      active={inTemplates.toString()}
      key="nav-templates"
      to="/templates"
    >
      Templates
    </NavBarLink>,
  )

  return navLinksLeft
}

const Navigation = props => {
  const { currentUser, location, client, logoutUser } = props
  const dropdownItems = [{ link: '/profile', label: 'Profile' }]
  if (!currentUser) return null

  if (currentUser && currentUser.admin) {
    dropdownItems.push(
        { link: '/globalTeams', label: 'Team Manager' },
        { link: '/aboutThisSite', label: 'About this site' }
    )
  }

  const itemsLeft = navLinksBuilder(
    location,
    currentUser.admin || currentUser.isGlobal,
  )

  return (
    <NavBar
      brand={<StyledLogo alt="Ketida" src="/ketida.png" />}
      itemsLeft={itemsLeft}
      itemsRight={
        <Dropdown
          client={client}
          currentUser={currentUser}
          dropdownItems={dropdownItems}
          logoutUser={logoutUser}
          title="User Menu dropdown"
        />
      }
    />
  )
}

export default compose(
  withRouter,
  withProps(props => ({
    logoutUser: client => {
      client.cache.reset()
      localStorage.removeItem('token')
      props.history.push('/login')
    },
  })),
)(Navigation)
