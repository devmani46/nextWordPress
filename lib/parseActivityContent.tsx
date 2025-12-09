import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';

/**
 * Extract YouTube video ID from various URL formats
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Parse activity content and convert YouTube URLs to embedded players
 */
export function parseActivityContent(htmlContent: string): JSX.Element | JSX.Element[] | string {
  if (!htmlContent) return '';

  // Convert plain text line breaks to <br> tags if content doesn't have HTML tags
  let processedContent = htmlContent;
  
  // Check if content has minimal HTML structure
  const hasHtmlTags = /<(p|div|ul|ol|li|h[1-6]|br)/i.test(htmlContent);
  
  if (!hasHtmlTags) {
    // Convert newlines to <br> tags for plain text content
    processedContent = htmlContent.replace(/\n/g, '<br>');
  }

  // First, detect standalone YouTube URLs and wrap them in a special marker
  const contentWithMarkers = processedContent.replace(
    /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s<])*)/g,
    '<div class="youtube-embed-marker" data-video-id="$2"></div>'
  );

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'div') {
        const className = domNode.attribs?.class;
        const videoId = domNode.attribs?.['data-video-id'];

        if (className === 'youtube-embed-marker' && videoId) {
          return (
            <div className="youtube-embed-container my-6" key={videoId}>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }
      }

      // Check for anchor tags with YouTube links
      if (domNode instanceof Element && domNode.name === 'a') {
        const href = domNode.attribs?.href;
        if (href) {
          const videoId = extractYouTubeId(href);
          if (videoId) {
            return (
              <div className="youtube-embed-container my-6" key={videoId}>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            );
          }
        }
      }
    },
  };

  return parse(contentWithMarkers, options);
}
