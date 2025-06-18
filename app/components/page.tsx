"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Countdown from './Countdown';
import { getTimerEndDate } from '../utils/timerUtils';
import { useMouseParallax } from '../hooks/useMouseParallax';
import CustomCursor from './CustomCursor';
import PixelRobot from './PixelRobot';

// This file can be safely deleted as it appears to be a duplicate of the main page.tsx