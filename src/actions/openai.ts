"use server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";
import { ContentItem, ContentType, Slide } from "@/lib/types";

// Removed top-level initialization to ensure fresh env variables per call

export const generateCreativePrompt = async (userPrompt: string) => {
  const systemInstruction =
    "You are a helpful AI that generates outlines for presentations.";
  const finalPrompt = `${systemInstruction} Create a coherent and relevant outline for the following topic: ${userPrompt}. The outline must include at least 6 points, each written as a single sentence, be well-structured, and directly address the topic. Return the output in this JSON format:
    {
      "outlines": [
        "Point 1",
        "Point 2",
        "Point 3",
        "Point 4",
        "Point 5",
        "Point 6"
      ]
    }
        Ensure that JSON is valid and properly formatted. Do not include any other text or explanation outside the JSON`;
  try {
    // console.log("⭕⭕⚠️⚠️⚠️⚠️⭕⭕⭕");
    // console.log("Environment Variables:", process.env);
    // console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    console.log("🚀 Calling Gemini for Outline with model: gemini-2.0-flash");

    const result = await model.generateContent({
      contents: [
        {
          role: "user", // Only use the 'user' role for the combined prompt
          parts: [
            {
              text: finalPrompt,
            },
          ],
        },
      ],
    });

    const text = result.response.text();
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    const cleanText = jsonMatch ? jsonMatch[1] : text; // Extract JSON part

    if (text) {
      console.log("Raw Gemini Response:", text);
      try {
        const parsedJSON = JSON.parse(cleanText);
        if (
          Array.isArray(parsedJSON.outlines) &&
          parsedJSON.outlines.length >= 6
        ) {
          return { status: 200, data: parsedJSON };
        } else {
          console.error(
            "Gemini response did not match expected format:",
            parsedJSON
          );
          return {
            status: 500,
            error: "Gemini response did not match expected format",
          };
        }
      } catch (error) {
        console.error(
          "⚠️⚠️⚠️Error parsing JSON response from Gemini:",
          error,
          text
        );
        return {
          status: 400,
          error: `Failed to parse JSON response: ${error}`,
        };
      }
    } else {
      console.warn("No text response from Gemini.");
      return { status: 500, error: "No text response from Gemini." };
    }
  } catch (error) {
    console.error("Error creating Gemini content:", error);
    return {
      status: 500,
      error: `Gemini API error: ${error}`,
    };
  }
};
const existingLayouts = [
  {
    id: uuidv4(),
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Accent left",
    type: "accentLeft",
    className: "min-h-[300px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      restrictDropTo: true,
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Resizable column",
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: "image" as ContentType,
              name: "Image",
              content:
                "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Title",
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Accent Right",
    type: "accentRight",
    className: "min-h-[300px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Resizable column",
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
            {
              id: uuidv4(),
              type: "image" as ContentType,
              name: "Image",
              restrictToDrop: true,
              content:
                "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Title",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Image and text",
    type: "imageAndText",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    // className: "grid grid-cols-2 gap-4 items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Image and text",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content:
                    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Title",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Text and image",
    type: "textAndImage",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content:
                    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Title",
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Two columns",
    type: "twoColumns",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "Paragraph",
              content: "",
              placeholder: "Start typing...",
            },
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "Paragraph",
              content: "",
              placeholder: "Start typing...",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Two columns with headings",
    type: "twoColumnsWithHeadings",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading3" as ContentType,
                  name: "Heading3",
                  content: "",
                  placeholder: "Heading 3",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "Start typing...",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading3" as ContentType,
                  name: "Heading3",
                  content: "",
                  placeholder: "Heading 3",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "Start typing...",
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Three column",
    type: "threeColumns",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Start typing...",
            },
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Start typing...",
            },
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Start typing...",
            },
          ],
        },
      ],
    },
  },
];

export const generateLayouts = async (projectId: string, theme: string) => {
  if (!projectId) return { status: 400, error: "Project Id is required" };

  const user = await currentUser();
  if (!user) return { status: 403, error: "User not Authenticated" };

  const userExist = await client.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!userExist || !userExist?.subscription) {
    return {
      status: 404,
      error: !userExist?.subscription
        ? "User does not have an active subscription"
        : "User not found in database",
    };
  }

  const project = await client.project.findUnique({
    where: { id: projectId, isDeleted: false },
  });

  if (!project) return { status: 404, error: "Project not found", data: [] };

  if (
    !project.outlines ||
    !Array.isArray(project.outlines) ||
    project.outlines.length === 0
  ) {
    return { status: 400, error: "Project does not have outlines", data: [] };
  }

  try {
    const outlines = Array.isArray(project.outlines)
      ? project.outlines.filter(
          (item): item is string => typeof item === "string"
        )
      : [];
    const layouts = await generateLayoutJson(outlines);
    if (layouts.status !== 200) {
      return layouts;
    }
    await client.project.update({
      where: { id: projectId },
      data: { slides: layouts.data as any, themeName: theme },
    });
    return { status: 200, data: layouts.data };
  } catch (error) {
    console.log("Error generating layouts:", error);
    return { status: 500, error: "Internal Server Error", data: [] };
  }
};

const findImageComponents = (layout: ContentItem): ContentItem[] => {
  const images = [];
  if (layout.type === "image") {
    images.push(layout);
  }
  if (Array.isArray(layout.content)) {
    layout.content.forEach((child) => {
      images.push(...findImageComponents(child as ContentItem));
    });
  } else if (layout.content && typeof layout.content === "object") {
    images.push(...findImageComponents(layout.content as ContentItem));
  }
  return images;
};

// const generateImage = async (prompt: string) => {
//   try {

//     // Improve prompt
//     const improvedPrompt = `
//     ${prompt}, highly realistic, professional quality, cinematic lighting, photorealistic, ultra-detailed, 8K, dramatic shadows, high texture fidelity, depth of field, DSLR shot, studio quality.
//     `;

//     const response = await axios.post(
//       "https://api.stability.ai/v2beta/stable-image/generate/core",
//       {
//         prompt: improvedPrompt,
//         output_format: "url",
//         style_preset: "photographic", // Choose "cinematic", "realistic", etc.
//         width: 1024,
//         height: 1024,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.STABILITY_AI_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ Image URL:", response.data.image);
//     return (
//       response.data.image ||
//       "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("❌ Error generating image:", error.message);
//     } else {
//       console.error("❌ Error generating image:", error);
//     }
//     return "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
//   }
// };

const searchPexelsImage = async (query:string
) => {
  const apiKey = process.env.PEXELS_API_KEY;

  // --- DEBUGGING STEP 1: Check if API Key and query exist ---
  console.log(`Attempting to search Pexels for: "${query}"`);

  if (!apiKey) {
    console.error("❌ CRITICAL: PEXELS_API_KEY is not defined. Make sure it's in your .env file and that dotenv is configured.");
    return "https://placehold.co/1024x1024/f87171/ffffff?text=API+Key+Missing";
  }

  if (!query || query.trim() === "") {
    console.warn("⚠️ Search query is empty. Returning a fallback image.");
    return "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }

  try {
    const url = "https://api.pexels.com/v1/search";
    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
      params: {
        query: query,
        per_page: 1,
        orientation: 'landscape',
      },
    });

    if (response.data?.photos?.length > 0) {
      const imageUrl = response.data.photos[0].src.original;
      console.log("✅ Pexels Image URL:", imageUrl);
      return imageUrl;
    } else {
      console.warn(`⚠️ No images found for query: "${query}"`);
      return "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }

  } catch (error) {
    console.error("❌ An error occurred while calling the Pexels API.");
    
    // --- DEBUGGING STEP 2: Log the detailed error from the API ---
    if (axios.isAxiosError(error)) {
      console.error("    Error Details: The API responded with:");
      console.error(`    - Status: ${error.response?.status}`);
      // This part is crucial - it will print the exact error message from Pexels
      console.error(`    - Data:`, error.response?.data); 
    } else {
      console.error("    A non-network error occurred:", (error as Error).message);
    }
    
    return "https://images.unsplash.com/photo-1620330400227-a051f6af31cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }
};


const replaceImagePlaceholders = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content);
  console.log("● Found image components:", imageComponents);

  for (const component of imageComponents) {
    console.log("● Generating image for component:", component.alt);
    try {
      component.content = await searchPexelsImage(
        component.alt || "Placeholder Image"
      );
    } catch (error) {
      console.error("Failed to generate image:", error);
      component.content = "default-placeholder.jpg";
    }
  }

  return layout; // Return the modified layout
};
// export const generateLayoutJson = async (outlineArray: string[]) => {
//   const systemInstruction = "You generate JSON Layouts for presentations.";
//   const prompt = `${systemInstruction} You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with an array of outlines, and for each outline, you must generate a unique and creative layout. Use the existing layouts as examples for structure and design, and generate unique designs based on the provided outline.

// ### Guidelines:
// 1. Write layouts based on the specific outline provided.
// 2. Use diverse and engaging designs, ensuring each layout is unique.
// 3. Adhere to the structure of existing layouts but add new styles or components if needed.
// 4. Fill placeholder data into content fields where required.
// 5. Generate unique image placeholders for the 'content' property of image components and also add text according to the outline.
// 6. Ensure proper formatting and schema alignment for the output JSON.

// ### Output Requirements:
// - Return the layouts in valid JSON format.
// - Ensure all placeholders (text, images, etc.) are clearly labeled and contextually relevant.
// - For images, the alt text should describe the image clearly.
// - Prioritize creativity while maintaining clarity and usability for presentation purposes.

// ### Example Layouts:
// ${JSON.stringify(existingLayouts, null, 2)}

// ### Outline Array:
// ${JSON.stringify(outlineArray)}

// For each entry in the outline array, generate:
// - A unique JSON layout with creative designs.
// - Properly filled content, including placeholders for image components.
// - Clear and well-structured JSON data.
// For images
// -The alt text should describe the image clearl and consely.`;

//   const prompt = `You generate JSON Layouts for presentations. Follow these rules STRICTLY:

// 1. Output MUST be valid JSON only - no markdown, no code blocks
// 2. Every string value must be properly escaped
// 3. All quotes must be straight quotes (") not curly quotes
// 4. Do not include any text outside the JSON structure
// 5. Ensure all brackets and braces are properly closed

// Here's the exact format to follow:
// ${JSON.stringify(exampleLayouts, null, 2)}

// Generate layouts for these outlines:
// ${JSON.stringify(outlineArray)}

// Respond ONLY with the JSON array of layouts.`;

//   try {
//     console.log("Generating layout JSON with prompt:", prompt);
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//       generationConfig: {
//         maxOutputTokens: 5000,
//         temperature: 0.7,
//       },
//     });

//     const result = await model.generateContent({
//       contents: [
//         {
//           role: "user", // Only use the 'user' role for the combined prompt
//           parts: [
//             {
//               text: prompt,
//             },
//           ],
//         },
//       ],
//     });

//     const text = await result.response.text();
//     // const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
//     // const cleanText = jsonMatch ? jsonMatch[1] : text; // Extract JSON part

//     if (!text) return { status: 500, error: "No Content generated" };

//     let jsonResponse;
//     try {
//       // Remove markdown code block markers if present
//       const cleanText = text.replace(/```json|```/g, "").trim();

//       // Parse the JSON
//       jsonResponse = JSON.parse(cleanText);

//       // If the response is an array, process each item
//       if (Array.isArray(jsonResponse)) {
//         await Promise.all(jsonResponse.map(replaceImagePlaceholders));
//       }

//       return {
//         status: 200,
//         data: jsonResponse,
//       };
//     } catch (parseError) {
//       console.error("JSON Parsing Error:", parseError);
//       throw new Error("Invalid JSON format received from AI");
//     }
//   } catch (error) {
//     console.log("Error generating layout JSON:", error);
//     return { status: 500, error: "Internal Server Error" };
//   }
// };

const generateLayoutJson = async (outlineArray: string[]) => {
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return { status: 500, error: "GOOGLE_API_KEY is not set." };
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 5000,
    }
  });

  console.log("🚀 Calling Gemini for JSON Layout with model: gemini-2.0-flash");

  // Prepare the prompt with strict formatting instructions
  const systemInstruction2 =
    "You generate creative and structured JSON layouts for presentation slides.";

  const prompt2 = `${systemInstruction2}

You are an intelligent and imaginative AI that designs JSON-based layouts for presentation slides. I will provide you with an array of topic outlines. Your job is to generate a visually engaging, well-structured layout in JSON format for **each** outline entry.

### GOAL:
- Generate one unique and creative slide layout **per outline**.
- Use the existingLayouts array as a structural reference for formatting, but enrich the 'content' field with realistic placeholder content.

### RULES:
1. Every layout must follow a valid and consistent JSON schema.
2. The \`content\` field in all components must be filled with meaningful sample content that reflects the outline.
   - **Do not leave \`content: ""\` or empty unless it's truly a blank layout.**
3. Image components must include:
   - A unique placeholder image URL
   - A descriptive and contextually relevant \`alt\` text.
4. Each layout should include:
   - Headings, paragraphs, and images where appropriate.
   - New creative arrangements (if needed) beyond existingLayouts.
5. Use the existingLayouts only for structural reference — not for empty content fields.
6. If the outline includes keywords, include those in headings, paragraphs, or image alt texts creatively.
7. All returned data must be valid JSON and formatted cleanly.
8. You may create new layout types if it improves creativity, but they should follow the general structural conventions of the given examples.

### EXAMPLE LAYOUTS:
${JSON.stringify(existingLayouts, null, 2)}

### OUTLINE ARRAY:
${JSON.stringify(outlineArray, null, 2)}

Now, for each entry in the outline array:
- Generate a complete layout object (with filled-in content).
- Use creative and engaging text content that fits the outline topic.
- Include image URLs and alt text relevant to the topic.
- Ensure that the layout is readable, valid, and visually balanced.
`;

  // const systemInstruction = "You generate JSON Layouts for presentations.";
  // const prompt = `${systemInstruction} You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with an array of outlines, and for each outline, you must generate a unique and creative layout. Use the existing layouts as examples for structure and design, and generate unique designs based on the provided outline.

  // ### Guidelines:
  // 1. Write layouts based on the specific outline provided.
  // 2. Use diverse and engaging designs, ensuring each layout is unique.
  // 3. Adhere to the structure of existing layouts but add new styles or components if needed.
  // 4. Fill placeholder data into content fields where required.
  // 5. Generate unique image placeholders for the 'content' property of image components and also add text according to the outline.
  // 6. Ensure proper formatting and schema alignment for the output JSON.

  // ### Output Requirements:
  // - Return the layouts in valid JSON format.
  // - Ensure all placeholders (text, images, etc.) are clearly labeled and contextually relevant.
  // - For images, the alt text should describe the image clearly.
  // - Prioritize creativity while maintaining clarity and usability for presentation purposes.

  // ### Example Layouts:
  // ${JSON.stringify(existingLayouts, null, 2)}

  // ### Outline Array:
  // ${JSON.stringify(outlineArray)}

  // For each entry in the outline array, generate:
  // - A unique JSON layout with creative designs.
  // - Properly filled content, including placeholders for image components.
  // - Clear and well-structured JSON data.
  // For images
  // -The alt text should describe the image clear and consicely.`;

  const generationConfig = {
    temperature: 0.7,
    maxOutputTokens: 5000,
  };

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt2 }] }],
      generationConfig,
    });

    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return { status: 400, error: "No content generated" };
    }

    // Robust JSON parsing with error handling
    let cleanText = text.trim();

    // Remove any potential markdown code blocks
    cleanText = cleanText.replace(/```(json)?/g, "");


    

    // Extract just the JSON portion
    const jsonStart = cleanText.indexOf("[");
    const jsonEnd = cleanText.lastIndexOf("]");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON array found in response");
    }

    cleanText = cleanText.slice(jsonStart, jsonEnd + 1);

    // =================================================================
    // TEMPORARY DEBUGGING LOG: Log the exact string before parsing
    console.log("--- Attempting to parse the following JSON text: ---");
    console.log(cleanText);
    console.log("-----------------------------------------------------");
    // =================================================================

    // Validate JSON structure before parsing
    const jsonResponse = JSON.parse(cleanText);

    if (!Array.isArray(jsonResponse)) {
      throw new Error("Response is not a JSON array");
    }

    // Process each layout to ensure consistency
    const processedLayouts = await Promise.all(
      jsonResponse.map(async (layout) => {
        // Regenerate IDs to ensure uniqueness
        layout.id = uuidv4();
        if (layout.content?.id) layout.content.id = uuidv4();

        // Process nested content IDs
        const processContent = (content: any) => {
          if (Array.isArray(content)) {
            return content.map((item) => {
              item.id = uuidv4();
              if (item.content) processContent(item.content);
              return item;
            });
          }
          return content;
        };

        if (layout.content?.content) {
          layout.content.content = processContent(layout.content.content);
        }

        return await replaceImagePlaceholders(layout);
      })
    );

    return { status: 200, data: processedLayouts };
  } catch (error) {
    console.error("Error generating layout JSON:", error);
    return {
      status: 500,
      error:
        error instanceof Error ? error.message : "Failed to generate layouts",
    };
  }
};
