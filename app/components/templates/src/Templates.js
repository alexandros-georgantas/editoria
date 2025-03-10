/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import styled from 'styled-components'

import TemplatesHeader from './ui/src/TemplatesHeader'
import TemplatesGrid from './ui/src/TemplatesGrid'

const Container = styled.div`
  clear: both;
  display: block;
  float: none;
  height: 100%;
  margin: 0 auto;
  max-width: 100%;
  overflow-y: auto;
`

const InnerWrapper = styled.div`
  clear: both;
  display: block;
  float: none;
  height: calc(100% - 80px);
  margin: 0 auto;
  max-width: 76%;
`

const Template = ({
  templates,
  onCreateTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
  setSortingParams,
  sortingParams,
  onChangeSort,
  refetching,
}) => {
  useEffect(() => {
    onChangeSort(sortingParams)
  }, [sortingParams])

  return (
    <Container>
      <>
        <TemplatesHeader
          canAddTemplates
          onCreateTemplate={onCreateTemplate}
          setSortingParams={setSortingParams}
          sortingParams={sortingParams}
          title="Templates"
        />
        <InnerWrapper>
          <TemplatesGrid
            onDeleteTemplate={onDeleteTemplate}
            onUpdateTemplate={onUpdateTemplate}
            refetching={refetching}
            templates={templates}
          />
        </InnerWrapper>
      </>
    </Container>
  )
}

export default Template
