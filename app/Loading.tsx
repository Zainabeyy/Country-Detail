import IonIcon from "@reacticons/ionicons";

export default function Loading() {
  return (
    <div className="max-w-screen min-h-screen flex-center overflow-hidden">
      <div className="w-40 flex justify-between items-center">
        <IonIcon name="airplane-outline" className="text-4xl animate-loading" />
        <IonIcon name="globe-outline" className="text-6xl" />
      </div>
    </div>
  );
}
