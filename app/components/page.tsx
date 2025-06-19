"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Countdown from './components/Countdown';
import { getTimerEndDate } from './utils/timerUtils';
import { useMouseParallax } from './hooks/useMouseParallax';
import CustomCursor from './components/CustomCursor';
import PixelRobot from './components/PixelRobot';

// ...existing code...