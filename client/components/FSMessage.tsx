function FSMessage({ children }: { children: HTMLElement | JSX.Element }) {
  return (
    <main className="full-screen-msg-container">
      <div className="msg-box">{children}</div>
    </main>
  );
}

export default FSMessage;
