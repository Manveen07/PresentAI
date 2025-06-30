import { Theme } from "@/lib/types"; // Importing the Theme type for type safety
import React from "react"; // Importing React for JSX
import { AnimationControls, motion } from "framer-motion"; // Importing framer-motion for animations
import { Card, CardContent } from "@/components/ui/card"; // Importing reusable Card and CardContent components
import Image from "next/image";

// Defining the Props type for the ThemeCard component
type Props = {
  title: string; // Title of the card
  description: string; // Description text for the card
  content: React.ReactNode; // Additional content to be rendered inside the card
  variant: "left" | "main" | "right"; // Animation variant for the card
  theme: Theme; // Theme object containing styling properties
  controls: AnimationControls; // Animation controls for framer-motion
};

const ThemeCard = ({
  content, // Content to be rendered inside the card
  controls, // Animation controls for the card
  variant, // Animation variant (left, main, or right)
  theme, // Theme object for styling
  description, // Description text
  title, // Title text
}: Props) => {
  // Animation variants for the card based on its position (left, main, or right)
  const variants = {
    left: {
      hidden: {
        opacity: 0, // Start fully transparent
        x: "-50%", // Start off-screen to the left
        y: "-50%", // Start off-screen to the top
        scale: 0.9, // Slightly smaller scale
        rotate: 0, // No rotation
      },
      visible: {
        opacity: 1, // Fully visible
        x: "-25%", // Move closer to the center
        y: "-25%", // Move closer to the center
        scale: 0.95, // Slightly larger scale
        rotate: -10, // Rotate slightly counterclockwise
        transition: {
          type: "spring", // Spring animation for smooth movement
          stiffness: 300, // Stiffness of the spring
          damping: 30, // Damping to reduce oscillation
          delay: 0.1, // Delay before the animation starts
        },
      },
    },
    right: {
      hidden: {
        opacity: 0, // Start fully transparent
        x: "50%", // Start off-screen to the right
        y: "50%", // Start off-screen to the bottom
        scale: 0.9, // Slightly smaller scale
        rotate: 0, // No rotation
      },
      visible: {
        opacity: 1, // Fully visible
        x: "25%", // Move closer to the center
        y: "25%", // Move closer to the center
        scale: 0.95, // Slightly larger scale
        rotate: 10, // Rotate slightly clockwise
        transition: {
          type: "spring", // Spring animation for smooth movement
          stiffness: 300, // Stiffness of the spring
          damping: 30, // Damping to reduce oscillation
          delay: 0.1, // Delay before the animation starts
        },
      },
    },
    main: {
      hidden: {
        opacity: 0, // Start fully transparent
        scale: 0.9, // Slightly smaller scale
      },
      visible: {
        opacity: 1, // Fully visible
        scale: 1, // Full size
        transition: {
          type: "spring", // Spring animation for smooth movement
          stiffness: 300, // Stiffness of the spring
          damping: 30, // Damping to reduce oscillation
          delay: 0.2, // Delay before the animation starts
        },
      },
    },
  };

  return (
    <motion.div
      initial="hidden" // Initial animation state
      animate={controls} // Animation controls passed as a prop
      variants={variants[variant]} // Animation variant based on the prop
      className="absolute w-full max-w-3xl" // Styling for the card container
      style={{ zIndex: variant === "main" ? 10 : 0 }} // Higher z-index for the main card
    >
      <Card
        className="h-full shadow-2xl backdrop-blur-sm" // Styling for the card
        style={{
          backgroundColor: theme.slideBackgroundColor, // Background color from the theme
          border: `1px solid ${theme.accentColor}20`, // Border color with transparency
        }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Responsive layout for the card */}
          <CardContent className="flex-1 p-8 space-y-6">
            {/* Card content with padding and spacing */}
            <div className="space-y-3">
              {/* Spacing between title and description */}
              <h2
                className="text-3xl font-bold tracking-tight" // Styling for the title
                style={{ color: theme.accentColor }} // Title color from the theme
              >
                {title} {/* Render the title */}
              </h2>
              <p
                className="text-lg" // Styling for the description
                style={{ color: `${theme.accentColor}90` }} // Description color with transparency
              >
                {description} {/* Render the description */}
              </p>
            </div>
            {content} {/* Render additional content */}
          </CardContent>
          <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden rounded-r-lg">
            <Image
              src="https://images.unsplash.com/photo-1742599968125-a790a680a605?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Theme Preview Image"
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ThemeCard; // Export the ThemeCard component
