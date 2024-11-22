/* eslint-disable react/prop-types */
export function VideoEmbed({ videoUrl }) {
    return (
      videoUrl ? (
        <div className="mt-4 flex justify-center sm:w-full lg:full xl:px-32">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src={videoUrl.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : null
    );
  }
  