import '@picocss/pico';
import React, { useState, useEffect, useReducer } from "react";
import TopSection from './components/topSection';
import FooterSection from './components/footerSection';
import SelectionsSection from './components/selectionsSection';

function App() {
  return (
    <div>
      <TopSection />
      <SelectionsSection />
      <FooterSection />
    </div>
  );
}

export default App;
