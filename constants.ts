
// IMPORTANT: API_KEY should be set in the environment as process.env.API_KEY
// For local development, you might use a .env file with a tool like dotenv (for Node.js)
// or rely on your build system (like Vite or Create React App) to inject it.
// This constant is here to signify its use, but the service will access process.env.API_KEY directly.
// export const API_KEY = process.env.API_KEY; 

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';

// Mock Data for Prompt Placeholders
export const MOCK_SALES_DATA_CSV = `date,item_sku,item_name,quantity_sold,price
2023-07-28,CB001,Cold Brew,50,4.50
2023-07-28,ESP001,Espresso,30,3.00
2023-07-29,CB001,Cold Brew,55,4.50
2023-07-29,LM002,Lavender Latte,20,5.00
... (90 days of data) ...
2023-10-25,CB001,Cold Brew,60,4.50
2023-10-25,AVT001,Avocado Toast,25,7.00`;

export const MOCK_WEATHER_FORECAST_JSON = JSON.stringify({
  "forecast": [
    { "date": "2023-10-26", "max_temp_f": 75, "min_temp_f": 60, "precipitation_chance": 0.1, "condition": "Sunny" },
    { "date": "2023-10-27", "max_temp_f": 78, "min_temp_f": 62, "precipitation_chance": 0.1, "condition": "Mostly Sunny" },
    { "date": "2023-10-28", "max_temp_f": 85, "min_temp_f": 65, "precipitation_chance": 0.05, "condition": "Hot and Sunny" },
    { "date": "2023-10-29", "max_temp_f": 90, "min_temp_f": 70, "precipitation_chance": 0.0, "condition": "Heatwave" },
    { "date": "2023-10-30", "max_temp_f": 88, "min_temp_f": 68, "precipitation_chance": 0.1, "condition": "Sunny" },
    { "date": "2023-10-31", "max_temp_f": 70, "min_temp_f": 55, "precipitation_chance": 0.4, "condition": "Cloudy, chance of rain" },
    { "date": "2023-11-01", "max_temp_f": 65, "min_temp_f": 50, "precipitation_chance": 0.6, "condition": "Rain" }
  ]
});

export const MOCK_LOCAL_EVENTS_TEXT = `City Marathon on Saturday, Oct 28. Street closures near 5th Ave. Expected large crowds.
Food Festival downtown Sunday, Oct 29.
Art Gallery opening Friday, Oct 27 evening.`;

export const MOCK_INVENTORY_LEVELS_JSON = JSON.stringify({
  "Cold Brew Concentrate": { "quantity_on_hand": 20, "unit": "liters" },
  "Espresso Beans": { "quantity_on_hand": 50, "unit": "kg" },
  "Milk (Dairy)": { "quantity_on_hand": 30, "unit": "gallons" },
  "Oat Milk": { "quantity_on_hand": 15, "unit": "gallons" },
  "Croissants": { "quantity_on_hand": 24, "unit": "pieces" },
  "Lavender Syrup": { "quantity_on_hand": 2, "unit": "liters" }
});

export const MOCK_CUSTOMER_PROFILES_JSON = JSON.stringify([
  { "id": 1, "name": "Sarah J.", "segment": "Weekday Regular", "visit_history": "28 visits in last 90 days, mostly M-F 8-9AM.", "last_purchases": ["Large Latte", "Oat Milk", "Croissant"] },
  { "id": 2, "name": "David L.", "segment": "Lapsed Vegan", "last_visit_days_ago": 45, "last_purchases": ["Vegan Breakfast Wrap", "Iced Americano", "Almond Milk"] },
  { "id": 3, "name": "Maria K.", "segment": "In-Store Retail Buyer", "visit_history": "Purchases whole coffee beans every 2 weeks.", "last_purchases": ["250g House Blend Beans", "Espresso", "Chemex Filters"] }
]);

export const MOCK_COMPETITOR_REVIEWS_TEXT = `Google Review for 'The Daily Grind': "The new Lavender Latte is amazing! 5 stars!"
Yelp for 'Brew & Bites': "Service was slow, but their seasonal pumpkin spice is good."
Google Review for 'The Daily Grind': "Overpriced for what it is. My cold brew was watery."`;

export const MOCK_SOCIAL_MEDIA_TEXT = `TikTok by @foodieNYC: "omg the new lavender latte at The Daily Grind is everything #coffeenyc #lavenderlatte"
Instagram post by @coffeelover123: "trying the olive oil coffee trend, not sure how I feel... #oliveoilcoffee #nyccoffee"
Tweet by @LocalExplorer: "Anyone know a good quiet coffee shop downtown for work? Tired of the usual spots."`;

export const MOCK_FOOD_BLOG_TEXT = `Article from 'NYC Coffee Chronicle': "The artisanal coffee scene in Manhattan is booming. Shops are experimenting with unique flavors like cardamom and rose..."
Blog post 'Downtown Brews': "We visited three new coffee spots this week. 'The Daily Grind' stands out with its innovative menu, though 'Brew & Bites' has a cozier atmosphere."
Review on 'CaffeineFiend': "Forget Starbucks, the real coffee gems are local. This week's highlight: Coffee Tasting Flights are becoming a thing!"`;


// --- New Mock Data for Employee Co-Pilot & Store Performance Diagnoser ---

export const MOCK_STAFF_SOP_EXCERPT_TEXT = `
Standard Operating Procedures - Catalyst Coffee Co.

Section 3: Customer Service
...
3.4 Customer Complaints:
  a. Listen actively and empathetically to the customer's concern.
  b. Apologize for the issue, even if it's not directly the company's fault.
  c. Offer a solution: remake the drink, offer a refund, or provide a voucher for a future visit.
  d. If the customer is still unsatisfied, escalate to the shift manager.
  e. Log all significant complaints in the daily shift report.
...
Section 5: Beverage Preparation
...
5.1 Espresso Machine Operation:
  a. Purge group head before each shot.
  b. Grind beans fresh per order. Target dose: 18-20g.
  c. Tamp evenly with consistent pressure.
  d. Extraction time should be between 25-30 seconds for a double shot.
  e. Clean portafilter and group head thoroughly after each use.
...
`;

export const MOCK_PRODUCT_GUIDE_EXCERPT_TEXT = `
Catalyst Coffee Co. - Product Guide

Ethiopian Yirgacheffe (Single Origin)
  - Tasting Notes: Bright citrus, floral, black tea. Delicate body.
  - Roast Level: Light-Medium
  - Best For: Pour over, Aeropress. Excellent as a black coffee.
  - Story: Sourced from smallholder farmers in the Yirgacheffe region, known for its high altitude and unique coffee varietals. Washed process.
  - Upselling Tip: "If you enjoy a lighter, more tea-like coffee, our Ethiopian Yirgacheffe is a fantastic choice. It has beautiful lemon and floral notes."

House Blend (Signature)
  - Tasting Notes: Chocolate, caramel, toasted nuts. Balanced and smooth.
  - Roast Level: Medium
  - Best For: Espresso, drip coffee, lattes. Versatile.
  - Story: A carefully selected blend of beans from Central and South America, designed for consistency and broad appeal.
  - Upselling Tip: "Our House Blend is a classic for a reason! It's perfect for your daily latte or a smooth black coffee."
`;

export const MOCK_STAFF_QUERY_EXAMPLES = [
  { id: "q1", query: "What's the process for handling a customer complaint about a cold coffee?" },
  { id: "q2", query: "Tell me about our new single-origin Ethiopian Yirgacheffe beans." },
  { id: "q3", query: "How do I properly clean the espresso machine group head?" },
  { id: "q4", query: "What are the tasting notes for the House Blend?" },
];


export const MOCK_STORE_DATA = {
  flagship_5th_ave: {
    pastry_sales_decline: {
      sales_data_extract_csv: `date,category,item,quantity_sold,revenue
2023-10-01,Pastries,Croissant,15,52.50
2023-10-01,Pastries,Almond Croissant,10,45.00
... (30 days, showing declining trend for pastries) ...
2023-10-30,Pastries,Croissant,8,28.00
2023-10-30,Pastries,Almond Croissant,5,22.50`,
      customer_feedback_summary_text: `Recent feedback mentions pastries sometimes "not fresh" or "a bit dry". Some positive comments on coffee quality. A few mentions of "The Daily Grind's new bakery section is amazing."`,
      competitor_activity_text: `The Daily Grind (2 blocks away) launched an expanded in-house bakery section three weeks ago with a grand opening promotion. They are heavily advertising "freshly baked hourly".`
    },
    coffee_bean_sales_low: {
      sales_data_extract_csv: `date,category,item,quantity_sold,revenue
2023-10-01,Retail Beans,House Blend 250g,5,60.00
2023-10-01,Retail Beans,Ethiopian Yirgacheffe 250g,2,32.00
... (30 days, low and stagnant retail bean sales) ...
2023-10-30,Retail Beans,House Blend 250g,4,48.00
2023-10-30,Retail Beans,Ethiopian Yirgacheffe 250g,1,16.00`,
      customer_feedback_summary_text: `Very few comments on retail beans. One customer asked if we offer grinding services. Most feedback is about beverages.`,
      competitor_activity_text: `Brew & Bites (competitor) offers a "subscribe and save" model for coffee beans with local delivery. They also promote "custom grind for your brew method".`
    }
  },
  downtown_main_st: {
    // Add more mock data for another store or concern if needed
  }
};

export const MOCK_PERFORMANCE_ISSUE_EXAMPLES = [
  { id: "issue1", storeDisplayName: "Flagship Store - 5th Avenue", storeInternalId: "flagship_5th_ave", concernDisplayName: "Declining Pastry Sales", concernInternalId: "pastry_sales_decline" },
  { id: "issue2", storeDisplayName: "Flagship Store - 5th Avenue", storeInternalId: "flagship_5th_ave", concernDisplayName: "Low Retail Coffee Bean Sales", concernInternalId: "coffee_bean_sales_low" },
];


// --- Prompts ---
export const SMART_INVENTORY_PROMPT_TEMPLATE = `
Role: You are an expert retail supply chain analyst and inventory management AI for a high-end coffee shop. Your primary goal is to maximize profitability by eliminating waste and preventing stockouts.

Context:
You are provided with the following data for the "Flagship Store - 5th Avenue" for the upcoming week (e.g., Oct 26 - Nov 1):
Sales History ({{sales_data_csv}}): A CSV of the last 90 days of sales data, with columns: date, item_sku, item_name, quantity_sold, price.
Weather Forecast ({{weather_forecast_json}}): A JSON object for the next 7 days showing date, max_temp_f, min_temp_f, precipitation_chance, condition (e.g., 'Sunny', 'Rain').
Local Events ({{local_events_text}}): A text file listing major local events. Example: "City Marathon on Saturday, Oct 28. Street closures near 5th Ave. Expected large crowds."
Current Inventory Levels ({{inventory_levels_json}}): A JSON object of key items and their current quantity_on_hand.

Task:
Analyze all the provided data. Identify the top 5 most critical inventory actions for the upcoming week. For each action, provide the product name, a recommended percentage change in the order amount (e.g., +30% or -15%), and a concise, one-sentence business reason for your recommendation, directly citing the data that influenced it.

Output Format:
Return your response as a single, clean JSON object. Do not include any other text or explanations.
The JSON should look like this:
{
  "projectedMonthlySavings": <integer_value>,
  "smartOrders": [
    {
      "product": "<Product Name>",
      "change": "<Percentage Change>",
      "reason": "<Concise business reason for the recommendation>"
    }
  ]
}
`;

export const CUSTOMER_AI_PROMPT_TEMPLATE = `
Role: You are a hyper-persuasive CRM and marketing AI strategist. Your expertise is in converting customer data into compelling, personalized messages that drive immediate sales and build long-term loyalty.

Context:
You are provided with a JSON object containing three distinct customer profiles from our coffee shop loyalty program.
{{customer_profiles_json}}

Task:
For each customer profile, generate one highly-targeted, short marketing message. The message should be specific, reference the customer's known behavior or preferences, and propose a clear call-to-action. Tailor the tone and channel (Push Notification, Email, or In-Store Staff Alert) to be most effective for that customer segment.

Output Format:
Return your response as a single, clean JSON object. The generatedMessage should contain the exact text to be used.
The JSON should look like this:
{
  "opportunities": [
    {
      "customerName": "Sarah J.",
      "insight": "High-frequency morning regular.",
      "channel": "Push Notification",
      "generatedMessage": "<Generated message for Sarah>"
    },
    {
      "customerName": "David L.",
      "insight": "Lapsed customer with a preference for vegan items.",
      "channel": "Email",
      "generatedMessage": "<Generated message for David>"
    },
    {
      "customerName": "Maria K.",
      "insight": "High-value retail customer currently in the store.",
      "channel": "Staff Alert",
      "generatedMessage": "<Generated message for Maria>"
    }
  ]
}
`;

export const MARKET_PULSE_PROMPT_TEMPLATE = `
Role: You are a senior market research analyst and business strategist for a major retail brand. You excel at synthesizing vast amounts of unstructured, public data into actionable intelligence.

Context:
You are provided with a data dump of recent, unstructured text data related to the coffee shop market in downtown Manhattan.
Competitor Reviews ({{competitor_reviews_text}}): A compilation of the last 50 Google and Yelp reviews for the top 3 local competitors.
Social Media Buzz ({{social_media_text}}): A transcript of relevant, trending TikToks and Instagram posts mentioning "coffee" in your area. Snippets include: "omg the new lavender latte at The Daily Grind is everything," and "trying the olive oil coffee trend."
Food Blogs ({{food_blog_text}}): The last three articles from influential local food bloggers reviewing coffee shops.

Task:
Analyze all the provided unstructured text. Perform two actions:
1. Provide a one-sentence summary of the most significant activity from our direct competitors.
2. Identify the top 3 emerging market trends (products, flavors, or experiences) and assign each a "heat score" from 1 (emerging) to 3 (trending hot).
3. Synthesize everything into a concise, executive-level Strategy Brief. This brief should recommend one specific, actionable business initiative that our coffee shop can take to leverage a trend and counter the competition.

Output Format:
Return your response as a single, clean JSON object.
The JSON should look like this:
{
  "competitorWatch": "<One-sentence summary of competitor activity>",
  "trendRadar": [
    { "trend": "<Name of Trend 1>", "heat": <1_to_3> },
    { "trend": "<Name of Trend 2>", "heat": <1_to_3> },
    { "trend": "<Name of Trend 3>", "heat": <1_to_3> }
  ],
  "strategyBrief": "<Your concise, actionable strategy recommendation for the CEO.>"
}
`;


export const EMPLOYEE_CO_PILOT_PROMPT_TEMPLATE = `
Role: You are an expert retail operations assistant and product knowledge AI for Catalyst Coffee Co.
Your goal is to provide clear, concise, and actionable answers to staff questions, drawing from the provided knowledge base.

Context:
You have access to excerpts from our company's Standard Operating Procedures (SOPs) and Product Guides.
Standard Operating Procedures Excerpt:
---
{{sop_excerpt}}
---
Product Guide Excerpt:
---
{{product_guide_excerpt}}
---

Staff Question: {{user_question}}

Task:
1. Analyze the staff member's question.
2. Formulate a direct and helpful answer based *only* on the provided SOP and Product Guide excerpts.
3. If the answer directly comes from a specific section of the SOP or Product Guide, cite the section if its name or number is apparent (e.g., "SOP Section 3.4", "Product Guide: Ethiopian Yirgacheffe"). Do not invent section names.
4. If the information is not in the provided excerpts, state that the information is not available in the current knowledge base. Do not invent answers or assume external knowledge.

Output Format:
Return your response as a single, clean JSON object.
The JSON should look like this:
{
  "query": "<The original staff question>",
  "answer": "<Your clear, concise answer based on the provided context. If not found, state that.>",
  "references": ["<Cited SOP section or Product name if applicable, e.g., 'SOP Section 3.4'>", "<Another reference if applicable>"]
}
`;


export const STORE_PERFORMANCE_DIAGNOSER_PROMPT_TEMPLATE = `
Role: You are an expert retail business analyst and turnaround strategist for a premium coffee shop chain.

Context:
You are analyzing a performance issue for a specific store.
Store Name: {{store_name}}
Area of Concern: {{area_of_concern}}

Supporting Data:
1. Sales Data Snippet for {{store_name}} (last 30 days for {{area_of_concern}}):
\`\`\`csv
{{sales_data_extract_csv}}
\`\`\`
2. Customer Feedback Summary for {{store_name}} (last 30 days related to the concern):
{{customer_feedback_summary_text}}
3. Recent Competitor Activity near {{store_name}} (relevant to the concern):
{{competitor_activity_text}}

Task:
1. Analyze all the provided context (Sales Data, Customer Feedback, Competitor Activity).
2. Identify the top 2-3 likely root causes for the stated 'Area of Concern' at the 'Store Name'. For each root cause, briefly mention the supporting data point(s).
3. Propose 2-3 actionable, prioritized recommendations to address the issue. For each recommendation, provide:
    a. The specific action.
    b. A brief rationale for why this action is proposed.
    c. The expected positive impact (e.g., "Increase pastry sales by X%", "Improve customer satisfaction regarding freshness").

Output Format:
Return your response as a single, clean JSON object.
The JSON should look like this:
{
  "store": "<Store Name>",
  "concern": "<Area of Concern>",
  "rootCauses": [
    { "cause": "<Description of Root Cause 1>", "supportingData": "<Brief mention of data supporting this cause, e.g., 'Customer feedback on dryness, Competitor X's new bakery'>" },
    { "cause": "<Description of Root Cause 2>", "supportingData": "<Brief mention of data supporting this cause>" }
  ],
  "recommendations": [
    { "action": "<Specific Actionable Recommendation 1>", "rationale": "<Why this is recommended>", "expectedImpact": "<Potential positive outcome>" },
    { "action": "<Specific Actionable Recommendation 2>", "rationale": "<Why this is recommended>", "expectedImpact": "<Potential positive outcome>" }
  ]
}
`;
