import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

import { useTranslation } from 'react-i18next'
import { dateTimeFormatter, fileSizeFormatter } from './helpers'
import InfoItem from './InfoItem'
import { Button, Icons } from '../../../../ui'

const { exitIcon } = Icons

const PreviewWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  padding-left: 16px;
  width: 35%;
`

const ClosePreview = styled.div`
  display: flex;
  height: 4.96%;
  justify-content: flex-end;
  width: 100%;
`

const ImagePreviewer = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  height: 53.79%;
  justify-content: center;
  width: 100%;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 41.25%;
  overflow-y: auto;
  width: 100%;
`

const InfoHeaderWrapper = styled.div`
  background: white;
  border-bottom: 1px solid black;
  display: flex;
  margin-bottom: 4px;
  position: sticky;
  top: 0;
  width: 100%;
`

const InfoHeader = styled.h2`
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeHeading4')};
  line-height: ${th('lineHeightHeading4')};
  margin: 0;
  padding: 0;
`

const ItemWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
  width: 100%;
`

const ItemHeader = styled.h5`
  font-family: ${th('fontHeading')};
  font-size: ${th('fontSizeHeading6')};
  line-height: ${th('lineHeightHeading6')};
  margin: 0;
  padding: 0;
`

/* eslint-disable react/prop-types */
const FileDetails = ({ file, updateFile, closeHandler }) => {
  const { url, id, updated, storedObjects } = file
  const { size, mimetype, imageMetadata } = storedObjects[0]

  const { t } = useTranslation()
  return (
    <PreviewWrapper>
      <ClosePreview>
        <Button
          danger
          icon={exitIcon}
          onClick={e => {
            closeHandler(undefined)
          }}
          title="Close"
        />
      </ClosePreview>
      <ImagePreviewer>
        <img alt={`thumbnail for file with id ${id}`} src={url} />
      </ImagePreviewer>
      <InfoSection>
        <InfoHeaderWrapper>
          <InfoHeader>{t('info')}</InfoHeader>
        </InfoHeaderWrapper>

        {/* <ItemWrapper>
          <ItemHeader>Name</ItemHeader>
          <InfoItem key={`${id}-name`} type="name" value={name} />
        </ItemWrapper> */}
        {/* <ItemWrapper>
          <ItemHeader>Alt</ItemHeader>
          <InfoItem key={`${id}-alt`} type="alt" value={alt || '-'} />
        </ItemWrapper> */}
        <ItemWrapper>
          <ItemHeader>{t('size')}</ItemHeader>
          <InfoItem key={`${id}-size`} value={fileSizeFormatter(size)} />
        </ItemWrapper>
        <ItemWrapper>
          <ItemHeader>{t('mimetype')}</ItemHeader>
          <InfoItem key={`${id}-mimetype`} value={mimetype} />
        </ItemWrapper>
        <ItemWrapper>
          <ItemHeader>{t('updated')}</ItemHeader>
          <InfoItem key={`${id}-updated`} value={dateTimeFormatter(updated)} />
        </ItemWrapper>
        <ItemWrapper>
          <ItemHeader>{t('dimensions_(w_x_h)')}</ItemHeader>
          <InfoItem
            key={`${id}-dimensions`}
            value={`${imageMetadata.width} x ${imageMetadata.height}`}
          />
        </ItemWrapper>
        <ItemWrapper>
          <ItemHeader>{t('color_space')}</ItemHeader>
          <InfoItem key={`${id}-colorSpace`} value={imageMetadata.space} />
        </ItemWrapper>
        <ItemWrapper>
          <ItemHeader>{t('density')}</ItemHeader>
          <InfoItem
            key={`${id}-density`}
            value={imageMetadata.density || '-'}
          />
        </ItemWrapper>
      </InfoSection>
    </PreviewWrapper>
  )
}

export default FileDetails
