export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="w-full h-16 border border-t flex justify-center items-center">
      <h1> &copy; {year} copyright. All rights reserved. </h1>
    </div>
  );
}
