interface MainContainerProp {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProp) => {
  return <div className="flex-1 p-4 ">{children}</div>;
};

export default MainContainer;
