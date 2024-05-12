import React from "react";

const Quote = () => {
  return (
    <div className="bg-slate-200  h-screen flex flex-col">
      <div className="bg-slate-200 max-w-lg m-auto flex justify-center flex-col items-center h-screen">
        <div className="max-w-lg  text-3xl font-bold">
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
          aperiam corrupti quisquam mollitia quam veritatis fuga dolor? Fugit
          quos omnis ipsum doloribus !"
        </div>
        <div className="mr-auto font-bold mt-1">
          <div className="text-slate-400  max-w-lg text-xl  font-semibold">
            Azhar khan
          </div>{" "}
          <div className="text-slate-400 text-sm max-w-lg  font-semibold">
            CEO | medium
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
