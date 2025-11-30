# Pet Adoption Cost Reality Calculator

A comprehensive, free pet cost calculator that helps prospective pet owners understand the true lifetime financial commitment of pet ownership. Features breed-specific data for 294 breeds (213 dogs + 81 cats) with location-based cost adjustments.

## 🌟 Features

- **294 Breed Database**: Complete UK Kennel Club dog breeds and TICA cat breeds
- **Searchable Breed Selection**: Real-time search and filter for easy breed selection
- **Location-Based Costs**: Postal code lookup for region-specific cost estimates
- **Comprehensive Cost Breakdown**: Covers adoption, vet care, food, grooming, insurance, training, and hidden costs
- **Lifetime Projections**: First-year, annual, and lifetime cost estimates
- **Progress Saving**: Save and resume calculations
- **Shareable Results**: Generate shareable links to cost breakdowns
- **SEO Optimized**: Rich schema markup and comprehensive content
- **Responsive Design**: Mobile-first design with Tailwind CSS 4
- **Modern Stack**: React 19, TypeScript, Vite

## 📊 Breed Coverage

- **213 Dog Breeds**: All UK Kennel Club recognized breeds
  - Small breeds (64): Affenpinscher, Bichon Frise, Chihuahua, etc.
  - Medium breeds (69): Beagle, Border Collie, Cocker Spaniel, etc.
  - Large breeds (80): German Shepherd, Golden Retriever, Labrador, etc.

- **81 Cat Breeds**: All TICA recognized breeds
  - Abyssinian, Bengal, British Shorthair, Maine Coon, Persian, Siamese, etc.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
pet-cost-calculator/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   │   └── blog-images/      # Blog post images
│   ├── src/
│   │   ├── components/       # React components
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── pages/           # Page components
│   │   ├── data/            # Breed data and blog articles
│   │   │   ├── breeds.json  # 294 breed database
│   │   │   └── blog-articles/
│   │   ├── lib/             # Utilities and helpers
│   │   ├── contexts/        # React contexts
│   │   └── hooks/           # Custom hooks
├── server/                   # Placeholder for compatibility
├── shared/                   # Shared constants
└── package.json
```

## 🎨 Key Components

### Searchable Breed Dropdown
- Real-time search and filtering
- Keyboard navigation support
- Shows result counts
- Case-insensitive search

### Calculator Form
- 8-step wizard interface
- Progress tracking
- Save/resume functionality
- Shareable results

### Cost Breakdown
- First-year costs
- Annual recurring costs
- Lifetime projections
- Category-wise breakdown

## 🔧 Technology Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Build Tool**: Vite
- **Routing**: Wouter
- **Icons**: Lucide React
- **PDF Export**: jsPDF

## 📝 Recent Updates

### v2.0.0 (Latest)
- ✅ Expanded breed database from 63 to 294 breeds
- ✅ Added searchable dropdown with real-time filtering
- ✅ Updated all pages with accurate breed statistics
- ✅ Enhanced SEO schema with correct breed counts
- ✅ Improved UX for breed selection

### v1.0.0
- Initial release with 63 breeds
- Basic calculator functionality
- Blog articles for popular breeds

## 🌐 Deployment

The project is configured for deployment on:
- **Vercel** (vercel.json included)
- **Netlify** (netlify.toml included)

Simply connect your GitHub repository to either platform for automatic deployments.

## 📄 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Add more breed-specific insights
- Implement breed comparison feature
- Add currency conversion for international users
- Enhance mobile responsiveness
- Add more blog content

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for prospective pet owners worldwide**

