import { Alert } from "@mui/material";

interface Props {
  entity: string;
}

const NoContent: React.FC<Props> = ({ entity }) => {
  return (
    <>
      <Alert severity="error">
        The entity <b>{entity}</b> doesn't have values saved, please create a new {entity}.
      </Alert>
    </>
  );
};

export default NoContent;