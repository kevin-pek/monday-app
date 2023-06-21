/// <reference types="node" />

interface Console {
    log(...data: any[]): void;
    error(...data: any[]): void;
    warn(...data: any[]): void;
    // Add other console methods if needed
  }
  
  declare var console: Console;
  