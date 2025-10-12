type ProjectModalProps = {
  src: string;
  onClose: () => void;
};

export function ProjectModal({ src, onClose }: ProjectModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-11/12 h-5/6 bg-neutral-900 rounded-lg shadow-2xl flex flex-col p-4"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing on inner click
      >
        <button
          onClick={onClose}
          className="absolute top-[-15px] right-[-15px] bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg z-10"
          aria-label="Close project preview"
        >
          &times;
        </button>
        <iframe
          src={src}
          title="Project Preview"
          className="w-full h-full border-0 rounded-md"
        />
      </div>
    </div>
  );
}
