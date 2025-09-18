import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dhlhpgsllrscuqgnnfys.supabase.co", 
        pathname: "/storage/v1/object/**", 
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);
