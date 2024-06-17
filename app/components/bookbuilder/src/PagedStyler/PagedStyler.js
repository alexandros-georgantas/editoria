/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { grid } from '@pubsweet/ui-toolkit'
import 'codemirror/mode/css/css'
import 'codemirror/lib/codemirror.css'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { useTranslation } from 'react-i18next'
import { Button, NavBarLink } from '../../../../ui'

import { serverUrl } from '../../../../getUrl'

const featureBookStructureEnabled =
  (process.env.FEATURE_BOOK_STRUCTURE &&
    JSON.parse(process.env.FEATURE_BOOK_STRUCTURE)) ||
  false

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  height: 100%;
  justify-content: flex-start;
  padding: 8px;
  width: 100%;
`

const EditorAreaWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  width: 0%;
`

const CodeEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const EditorToolbar = styled.div`
  display: flex;
  justify-content: flex-end;

  > button:not(:last-child) {
    margin-right: ${grid(1)};
  }
`

const EditorArea = styled.div`
  height: 95%;

  .react-codemirror2 {
    height: 100%;

    .CodeMirror {
      height: 100%;
    }
  }
`

const PreviewArea = styled.div`
  flex-grow: 1;
  height: 100%;

  iframe {
    height: 100%;
    width: 100%;
  }
`

const handleDownload = hashed => e => {
  e.preventDefault()
  axios
    .get(`${serverUrl}/api/fileserver/paged/${hashed}/index.html`)
    .then(res => {
      window.location.replace(res.request.responseURL)
    })
    .catch(err => console.error(err))
}

const getCssFile = template =>
  template.files.find(file => file.storedObjects[0].mimetype === 'text/css')

const PagedStyler = ({
  bookId,
  bookTitle,
  currentUser,
  hashed,
  previewerLink,
  history,
  template,
  onWarningModal,
}) => {
  const [cssFile, setCssFile] = useState()
  const [random, setRandom] = useState('')
  const { id } = template
  const templateFile = getCssFile(template)

  const { t } = useTranslation()
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${serverUrl}/uploads/temp/previewer/${hashed}/${templateFile.name}`,
      )

      const file = await response.text()
      setCssFile(file)
    }

    fetchData()
  }, [hashed, id])

  if (
    featureBookStructureEnabled &&
    !currentUser.admin &&
    !currentUser.isGlobal
  ) {
    return (
      <Wrapper>
        <PreviewArea>
          <iframe
            frameBorder="0"
            id="printBook"
            key={random}
            src={previewerLink}
            title="PagedJS"
          />
        </PreviewArea>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <EditorAreaWrapper>
        <CodeEditorWrapper>
          <EditorToolbar>
            <Button
              label="Save"
              onClick={() =>
                onWarningModal(
                  bookId,
                  bookTitle,
                  templateFile,
                  cssFile,
                  template,
                  hashed,
                  history,
                ).then(() => setRandom(Math.random().toString(36).substring(7)))
              }
              title="Save"
            />
            <Button
              label="Download HTML"
              onClick={handleDownload(hashed)}
              title="Download HTML"
            />

            {previewerLink && (
              <Button
                label="Print"
                onClick={() => window.open(previewerLink, '_blank')}
                title="Print"
              />
            )}
            <NavBarLink to={`/books/${bookId}/book-builder`}>
              {/* Back to book */}
              {t('back_to_book')}
              {/* <Trans i18nKey="back_to_book">Back to book</Trans> */}
            </NavBarLink>
          </EditorToolbar>
          <EditorArea>
            <CodeMirror
              onBeforeChange={(editor, data, newValue) => {
                setCssFile(newValue)
              }}
              options={{
                mode: 'css',
                lineWrapping: true,
                lineNumbers: true,
                readOnly: false,
              }}
              value={cssFile}
            />
          </EditorArea>
        </CodeEditorWrapper>
      </EditorAreaWrapper>
      <PreviewArea>
        <iframe
          frameBorder="0"
          id="printBook"
          key={random}
          src={previewerLink}
          title="PagedJS"
        />
      </PreviewArea>
    </Wrapper>
  )
}

PagedStyler.propTypes = {}

export default PagedStyler
