import React from 'react'
import PropTypes from 'prop-types'

import AbModal from '../../common/src/AbstractModal'

class RemoveBookModal extends React.Component {
  renderBody() {
    const { book } = this.props

    return (
      <span>Are you sure you want to permanently delete {book.title}?</span>

      /* <span> {t("are_you_sure_you_want_to_permanently_delete_{book.title}?",book)}</span> */
    )
  }

  render() {
    const { container, remove, show, toggle } = this.props

    const title = 'Delete Book'
    const successText = 'Delete'

    const body = this.renderBody()

    return (
      <AbModal
        body={body}
        container={container}
        show={show}
        successAction={remove}
        successText={successText}
        title={title}
        toggle={toggle}
      />
    )
  }
}

/* eslint-disable react/forbid-prop-types */

RemoveBookModal.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  container: PropTypes.any.isRequired,
  remove: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

RemoveBookModal.defaultProps = {
  book: null,
}

export default RemoveBookModal
