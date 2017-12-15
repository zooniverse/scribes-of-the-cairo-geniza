import React from 'react';

export default function Home() {
  return (
    <section className="toolbar">
      <button>&#x02A01;</button>
      <button><i className="fa fa-arrows" /></button>

      <hr />

      <button><i className="fa fa-plus" /></button>
      <button><i className="fa fa-minus" /></button>
      <button><i className="fa fa-repeat" /></button>
      <button><i className="fa fa-adjust" /></button>
      <button><i className="fa fa-eye" /></button>
      <button><i className="fa fa-refresh" /></button>

      <hr />

      <button><i className="fa fa-heart-o" /></button>
      <button><i className="fa fa-list" /></button>
    </section>
  );
}
