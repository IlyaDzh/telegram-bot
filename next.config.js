const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants');


const bootServices = async () => {
  return fetch('http://localhost:3000/api/_boot')
      .then(async (res) => {
        const resJson = await res.json();

        return JSON.stringify('End boot service');
      }).catch((e) => {
          console.error(e)
          return false
      });
}

const nextConfig = {
    reactStrictMode: false,
    experimental: {
        instrumentationHook: true
    }
};

module.exports = async (phase, { defaultConfig }) => {
    // if (process.argv.includes('dev') && phase === PHASE_DEVELOPMENT_SERVER) {
    //     console.log('[ next.config.js (dev) ]');
    //
    //     void (async function test(){
    //         let bootedServices = await bootServices();
    //         if(!bootedServices){
    //             await new Promise(resolve => {
    //                 setTimeout(async ()=>{
    //                     bootedServices = await bootServices();
    //                     resolve();
    //                 },5000)
    //             })
    //         }
    //
    //         console.log(`[ next.config.js (dev) ] => bootedServices: ${bootedServices}`);
    //     })()
    // } else if (process.argv.includes('start') && phase === PHASE_PRODUCTION_SERVER) {
    //     console.log('[ next.config.js (start) ]');
    //
    //     const bootedServices = await bootServices();
    //     console.log(`[ next.config.js (start) ] => bootedServices: ${bootedServices}`);
    // }

    return nextConfig;
};
