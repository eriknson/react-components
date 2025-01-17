import PropTypes from 'prop-types'
import { ButtonV2 } from '../Button/V2'
import { ButtonRow, Dialog, ErrorBox } from '../Layout'
import { SmartLink } from '../SmartLink'
import { GLIF_DISCORD, GLIF_TWITTER } from '../../constants'

export const ErrorView = ({
  description,
  linkhref,
  linkDisplay,
  title,
  sendHome
}) => {
  let sendHomeCB = sendHome
  if (!sendHome) {
    sendHomeCB = () => {
      window.location.href = window.location.origin
    }
  }
  return (
    <Dialog>
      <ErrorBox>
        <h2>{title}</h2>
        <hr />
        <p>{description}</p>
        {linkhref && linkDisplay && (
          <p>
            <SmartLink href={linkhref}>{linkDisplay}</SmartLink>
          </p>
        )}
        <hr />
        <p>
          Get help in <SmartLink href={GLIF_DISCORD}>Discord</SmartLink> or hit
          us up on <SmartLink href={GLIF_TWITTER}>Twitter</SmartLink>
        </p>
      </ErrorBox>
      <ButtonRow>
        <ButtonV2 onClick={sendHomeCB}>Back</ButtonV2>
      </ButtonRow>
    </Dialog>
  )
}

ErrorView.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  linkhref: PropTypes.string,
  linkDisplay: PropTypes.string,
  sendHome: PropTypes.func
}
