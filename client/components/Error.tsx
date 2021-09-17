import { FormattedMessage } from "react-intl";
function Error() {
  return (
    <div>
      <FormattedMessage
        defaultMessage={
          "Sorry, it seems like there is a problem. Please reload the page, if still it doesn't work, contact us"
        }
      />
    </div>
  );
}

export default Error;
