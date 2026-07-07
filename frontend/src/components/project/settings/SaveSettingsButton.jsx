import Button from "../../common/Button";

export default function SaveSettingsButton({
  onClick,
}) {
  return (
    <div className="flex justify-end">

      <Button onClick={onClick}>

        Save Settings

      </Button>

    </div>
  );
}