export interface ProjectSpec {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'fullstack' | 'systems' | 'oss';
  year: string;
  image: string;
  alt: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  codeSnippet: string;
}

export const PROJECTS: ProjectSpec[] = [
  {
    id: 'hyperscale-ai',
    title: 'HyperScale AI Orchestrator',
    subtitle: 'Distributed AI Inference Pipeline',
    description: 'A high-throughput distributed token dispatch engine for multi-agent LLM systems with real-time streaming, edge caching, and live diagnostics.',
    longDescription: 'HyperScale coordinates distributed LLM inference pipelines with real-time stream token processing. It features token backpressure buffers, speculative verification, and cluster failover across GPU compute nodes with zero layout shift.',
    category: 'fullstack',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz6GyTy2FhXK5T2PfHfb2pmmd27Wz3UhFBLMv5LWhcwAvk9hBD8ScPcX5lKyRJeZ5Ghu0sXMvmuNQMX5qlFagbHdataMC9L3fb8PKvt-I14q74dS77hAZaeX3ppEyxPhr84y1a3L4NgpKItzYzmzTyQS7iHn_foXnvLkILibF3KZT3a2sQdli2YDR6N6jaH13q7MCDcJi7P36dSH4aae-hn6o2fn3LVwL6oJ66LzrxNp7vbKHxxM9O',
    alt: 'HyperScale AI Dashboard',
    tags: ['Next.js 15', 'TypeScript', 'WebSockets', 'FastAPI'],
    codeSnippet: `// Token stream dispatcher with backpressure buffer
pub async fn dispatch_token_stream<S>(
    mut input_rx: mpsc::Receiver<TokenChunk>,
    client_tx: S,
) -> Result<(), DispatchError>
where
    S: Sink<Frame, Error = WsError> + Unpin,
{
    let mut ring_buffer = RingBuffer::with_capacity(4096);
    while let Some(chunk) = input_rx.recv().await {
        let compressed = lz4_compress(&chunk.bytes)?;
        ring_buffer.push_back(compressed);
        if ring_buffer.is_full() {
            flush_stream_direct(&mut ring_buffer, &mut client_tx).await?;
        }
    }
    Ok(())
}`
  },
  {
    id: 'devpulse-olap',
    title: 'DevPulse Telemetry Platform',
    subtitle: 'Real-Time Observability Engine',
    description: 'Real-time event pipeline consuming millions of distributed microservice traces daily with sub-second queries and interactive visual charts.',
    longDescription: 'DevPulse unifies distributed microservice tracing, memory profiling, and columnar metrics aggregation into a clean observability surface with instantaneous filtering over millions of telemetry spans.',
    category: 'systems',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbx5Ymllwh_xHLI_UhLy97UbXb1gotbdYxiWrVi8glP3ZEeIGEs6R7TTfWKv0R5Ms7UonECZL3uo81dohZDg6CtJMDvtu1z9LSkmIMcCYbKek0SxLLq5MVfmnJKerISfa75w0WdZaFkVqsLp5L0yDCryXRpGassCAZvJWt6VJqiV1Ws0uLgsSkTtfMKY6Rnv7bOXqAtiML0f3otvaw05RdIU1rTNBshQfkQ1bDAcf_iCw5vj1QAiRy',
    alt: 'DevPulse Telemetry Dashboard',
    tags: ['TypeScript', 'ClickHouse', 'Kafka', 'Tailwind CSS'],
    codeSnippet: `// Vectorized span aggregation query
SELECT
    toStartOfMinute(timestamp) AS window,
    service_name,
    quantileExactWeighted(0.99)(duration_ms, weight) AS p99_latency,
    count() AS total_spans
FROM telemetry.spans
WHERE timestamp >= now() - INTERVAL 1 HOUR
GROUP BY window, service_name
ORDER BY window DESC;`
  },
  {
    id: 'kite-engine',
    title: 'Kite Headless UI Engine',
    subtitle: 'Open Source Token Compiler',
    description: 'A headless token compiler outputting sub-atomic DOM bindings with zero layout thrashing, accessible primitives, and 1,200+ GitHub stars.',
    longDescription: 'Kite compiles declarative JSON design tokens and state models straight into zero-runtime WebAssembly memory shaders, achieving instantaneous paint responses under heavy canvas manipulations.',
    category: 'oss',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBB70ck91ImARhN_fG-jjRNX1onVKv2TaK1D480QctTMKd3UXxUFN_NrTJoDDuvzIT-ZKEt-iQkI4GW7NfZb4wBSr-r63R8l59REOaP-go8nVbf1VwzSX8MZqbkwMC8qIIHusuX4KUGF9h98q3vgJjljlIHTxXKqCvCOplzv6g99uIgOzwI9hiFIkV2OF7KauCo1FvXd3oTp8h4mx_HYxrPTzLATBvnwjuPNaZp6-o0PkLMxNpGLoc',
    alt: 'Kite Design Engine Interface',
    tags: ['Rust', 'WebAssembly', 'React 19', 'Turborepo'],
    codeSnippet: `// Token shader matrix commit binding
#[wasm_bindgen]
pub struct TokenShaderMatrix {
    tokens: Vec<TokenBinding>,
    dirty_flags: u64,
}

#[wasm_bindgen]
impl TokenShaderMatrix {
    pub fn commit_atomic_paint(&mut self, ptr: *mut u8, len: usize) {
        unsafe {
            let slice = std::slice::from_raw_parts_mut(ptr, len);
            apply_microspring_interpolate(slice, self.dirty_flags);
        }
        self.dirty_flags = 0;
    }
}`
  }
];
