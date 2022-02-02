import Typewriter from 'typewriter-effect';
import banner from '../images/paulmorar.svg';

export default function Index() {
  return (
    <div className="h-screen text-white font-sans">
      <div className="container mx-auto h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="relative w-10/12 max-w-screen-sm py-4 px-8 md:py-6 md:px-16">
            <div className="absolute top-0 left-0 rotate-5">
              <h1 className="text-base md:text-4xl">Hey there 👋</h1>
              <h1 className="text-base md:text-4xl">I'm</h1>
            </div>
            <img className="w-full" src={banner} />
            <div className="flex flex-row justify-end mr-osm md:mr-omd py-4 md:py-6 rotate-5">
              <h1 className="text-base md:text-4xl">
                <Typewriter
                  options={{
                    strings: [
                      'I daily write code 🖥',
                      'I often design 💅',
                      'I sometimes brew beer 🍺',
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
